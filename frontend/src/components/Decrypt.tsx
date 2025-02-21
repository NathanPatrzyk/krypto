import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { LockKeyholeOpen } from "lucide-react";
import LZString from "lz-string";

export default function Decrypt() {
  const [text, setText] = useState("");

  function handleText(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    alert(LZString.decompressFromEncodedURIComponent(text));

    setText("");
  }
  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Descriptografar</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="text">Texto Criptografado</Label>
                  <Input
                    id="text"
                    type="text"
                    placeholder="Escreva o que deseja criptografar..."
                    required
                    onChange={handleText}
                    value={text}
                  ></Input>
                </div> 
                <Button>
                  <LockKeyholeOpen />
                  Descriptografar
                </Button>
                <div className="rounded-md border px-4 py-2 text-sm">
                   Seu texto descriptografado aparecerá aqui...
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
