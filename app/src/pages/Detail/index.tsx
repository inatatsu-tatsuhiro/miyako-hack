import React, { useEffect, useState } from "react";
import { Board } from '../../components/Board'
import { styled } from '@stitches/react'
import { Color } from '../../libs/Color'
import { Select } from "../../domains/Problem";
import { GetForm } from "../../libs/FormHandler";
import { useParams } from "react-router";
import { Button } from "../../components/Button";
import { SelectTestCard } from "../../components/ProblemCard/SelectTest";
import {
  setMessage,
  setTransaction,
  requestSign,
  requestSignEncription,
  getActivePublicKey,
} from "sss-module";
import axios from "axios";
import { AccountMetadataTransaction, AggregateTransaction, Deadline, NetworkType, PublicAccount, RepositoryFactoryHttp, SignedTransaction, UInt64 } from "symbol-sdk";

const issuerPublicKey =
  "01F6119ABD364B8F87578ED33857FA408F49E4F8B380260D17934413F4262975";

export const GENERATION_HASH =
  '49D6E1CE276A85B70EAFE52349AACCA389302E7A9754BCF1221E79494FC665A4'

  const NODE_URL = 'https://sym-test-03.opening-line.jp:3001'

export const EPOCH_ADJUST = 1667250467

export const deadline = Deadline.create(EPOCH_ADJUST)
export const fee = UInt64.fromUint(2000000)

export const DetailPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const { formId } = useParams();
  const [selects, setSelects] = useState<number[][]>([]);
  const [problems, setProblems] = useState<Select[]>([]);
  useEffect(() => {
    GetForm(`${formId}`).then((data) => {
      setProblems(data.problems);
      const initSelects = new Array(data.problems.length).fill([]);
      setSelects(initSelects);
      setTitle(data.title);
    });
  }, []);

  const submit = () => {
    const newSelects = selects.map((s) => s.sort());
    const data = {
      title,
      selects: newSelects,
    };
    setMessage(JSON.stringify(data), issuerPublicKey);

    const alicePublicKey = getActivePublicKey();

    requestSignEncription().then((msg) => {
      console.log("encryptedPayload");
      console.log(msg.payload);
      console.log(alicePublicKey);

      const body = {
        publicKey: alicePublicKey,
        message: `${msg.payload}`,
        id: `${formId}`,
      };

      axios
        .post("https://endpoint-5uak4tcxtq-uc.a.run.app/v1/form", body)
        .then((data) => {
          const payload = data.data.metadataTx
          const metadataTransaction = AccountMetadataTransaction.createFromPayload(payload)
          const Holder = PublicAccount.createFromPublicKey(
            getActivePublicKey(),
            NetworkType.TEST_NET
          )

          const agTx = AggregateTransaction.createComplete(
            deadline,
            [metadataTransaction.toAggregate(Holder)],
            NetworkType.TEST_NET,
            [],
            fee
          )
          console.log({ agTx })

          setTransaction(agTx)

          requestSign().then((signedTx: SignedTransaction) => {
            console.log({ signedTx })
            const repoFac = new RepositoryFactoryHttp(NODE_URL)
            const transactionHttp = repoFac.createTransactionRepository()
            transactionHttp.announce(signedTx)
          })
        });
    });
  };

  const body = () => {
    return (
      <Body>
        {problems.map((problem: Select, index) => {
          return (
            <SelectTestCard
              problem={problem}
              key={problem.title}
              select={selects[index]}
              setSelect={(selects) =>
                setSelects((prev) => {
                  const newPrev = prev.map((p, i) =>
                    i === index ? selects : p
                  );
                  return newPrev;
                })
              }
            />
          );
        })}
        <Button clickHandler={submit} label="回答" />
      </Body>
    );
  };

  return <Board header={<Title>{title}</Title>} body={body()} />;
};

const Title = styled("div", {
  color: Color.text,
  fontSize: "20px"
})
const Body = styled("div", {
  color: Color.text,
  fontSize: "20px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px"
})
