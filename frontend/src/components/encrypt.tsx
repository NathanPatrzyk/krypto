import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { LockKeyhole, KeyRound } from "lucide-react";

import LZString from "lz-string";
import CryptoJS from "crypto-js";

export default function Encrypt() {
  const [text, setText] = useState<string>("");
  const [threeDESKey, setThreeDESKey] = useState<string>("");

  function handleText(event: ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  function handleThreeDESKey(event: ChangeEvent<HTMLInputElement>) {
    setThreeDESKey(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const compressedText = LZString.compressToEncodedURIComponent(text);

    setText("");
    setThreeDESKey("");
  }

  function handleGenerateThreeDESKey(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const threeDESKey = CryptoJS.lib.WordArray.random(24).toString(
      CryptoJS.enc.Hex
    );
    setThreeDESKey(threeDESKey);
  }

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Criptografar</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="text">Texto Claro</Label>
                  <Input
                    id="text"
                    type="text"
                    placeholder="Escreva o que deseja criptografar..."
                    required
                    onChange={handleText}
                    value={text}
                  ></Input>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="text">
                    Chave secreta 3DES (192 bits, devido aos bits de paridade)
                  </Label>
                  <div className="flex w-full max-w-md items-center space-x-2">
                    <Input
                      id="threeDESKey"
                      type="text"
                      placeholder="Escreva ou gere sua chave secreta 3DES..."
                      required
                      onChange={handleThreeDESKey}
                      value={threeDESKey}
                    ></Input>
                    <Button onClick={handleGenerateThreeDESKey}>
                      <KeyRound />
                      Gerar
                    </Button>
                  </div>
                </div>

                <Button type="submit">
                  <LockKeyhole />
                  Criptografar
                </Button>
                <div className="rounded-md border px-4 py-2 text-sm">
                  Seu texto criptografado aparecerá aqui...
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
