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
  requestSignEncription,
  getActivePublicKey,
} from "sss-module";

const issuerPublicKey =
  "E75C4B6795B46BC4769A0819F737805F7CFD7665EC9943E47C8B015D9AA74C6F";

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
