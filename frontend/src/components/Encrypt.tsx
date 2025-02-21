import { useState } from "react";
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

export default function Encrypt() {
  const [text, setText] = useState("");

  function handleText(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    alert(LZString.compressToEncodedURIComponent(text));

    setText("");
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
                  <Label htmlFor="text">Chave secreta 3DES</Label>
                  <div className="flex w-full max-w-md items-center space-x-2">
                    <Input
                      id="text"
                      type="text"
                      placeholder="Escreva ou gere sua chave secreta 3DES..."
                      required
                      onChange={handleText}
                      value={text}
                    ></Input>
                    <Button type="submit">
                      <KeyRound />
                      Gerar
                    </Button>
                  </div>
                </div>

                <Button>
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
