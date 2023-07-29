import { Request, Response } from 'express'
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {
  Account,
  AccountMetadataTransaction,
  AggregateTransaction,
  Convert,
  Deadline,
  EncryptedMessage,
  KeyGenerator,
  NetworkType,
  PlainMessage,
  PublicAccount,
  RepositoryFactoryHttp,
  TransferTransaction,
  UInt64,
} from "symbol-sdk";
import { sha3_256 } from "js-sha3";
const GENERATION_HASH =
  "49D6E1CE276A85B70EAFE52349AACCA389302E7A9754BCF1221E79494FC665A4";

const EPOCH_ADJUST = 1667250467;

const deadline = Deadline.create(EPOCH_ADJUST);
const fee = UInt64.fromUint(2000000);

export async function formHandler(req: Request, res: Response) {
  functions.logger.info(req.body);
  const { publicKey, message, id } = req.body;

  functions.logger.info(publicKey);
  functions.logger.info(message);
  functions.logger.info(id);
  const issuerPrivateKey = `${process.env.SERVICE_ACCOUNT}`;

  const issuerAccount = Account.createFromPrivateKey(
    issuerPrivateKey,
    NetworkType.TEST_NET
  );
  const holderAccount = PublicAccount.createFromPublicKey(
    publicKey,
    NetworkType.TEST_NET
  );

  const msg = issuerAccount.decryptMessage(
    new EncryptedMessage(message, holderAccount),
    holderAccount
  );

  const m = JSON.parse(msg.payload);

  const db = admin.firestore();

  const docSnap = await db.doc(`forms/${id}`).get();

  const data = docSnap.data();

  const problems = data?.problems.map((p: any) => p.correct);

  const tmp = [...Array(problems.length).keys()];

  const count = tmp.filter(
    (i: number) => problems[i].toString() === m.selects[i].toString()
  ).length;

  const credential = {
    protocol: "miyako-hack",
    issuer: issuerAccount.publicKey,
    credential: {
      name: `${m.title}`,
      id: id,
      score: `${count} / ${problems.length}`,
    },
  };

  functions.logger.log(credential);

  const encryptedCredential = issuerAccount.encryptMessage(
    JSON.stringify(credential),
    holderAccount
  );

  const credentialTransaction = TransferTransaction.create(
    deadline,
    holderAccount.address,
    [],
    encryptedCredential,
    NetworkType.TEST_NET
  );

  const credentialHash = sha3_256(JSON.stringify(credential));

  const credentialIndex = {
    issuer: issuerAccount.publicKey,
    key: `MIYAKO-${id}`,
    hash: credentialHash,
  };

  const indexMessage = PlainMessage.create(JSON.stringify(credentialIndex));

  const indexTransaction = TransferTransaction.create(
    deadline,
    holderAccount.address,
    [],
    indexMessage,
    NetworkType.TEST_NET
  );

  const agTx = AggregateTransaction.createComplete(
    deadline,
    [
      indexTransaction.toAggregate(issuerAccount.publicAccount),
      credentialTransaction.toAggregate(issuerAccount.publicAccount),
    ],
    NetworkType.TEST_NET,
    [],
    fee
  );

  const signedTx = issuerAccount.sign(agTx, GENERATION_HASH);

  const repoFac = new RepositoryFactoryHttp(`${process.env.NODE_URL}`);
  const transactionHttp = repoFac.createTransactionRepository();
  transactionHttp.announce(signedTx).subscribe((x) => console.log({ x }));

  const metadataKey = KeyGenerator.generateUInt64Key(credentialIndex.key);

  const value = Convert.hexToUint8(signedTx.hash);

  const metadataTransaction = AccountMetadataTransaction.create(
    deadline,
    holderAccount.address,
    metadataKey,
    value.length,
    value,
    NetworkType.TEST_NET
  );

  const serialized = metadataTransaction.serialize();

  res.send({
    metadataTx: serialized,
  });
}