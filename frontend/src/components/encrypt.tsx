import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { LockKeyhole } from "lucide-react";
import { Progress } from "./ui/progress";
import { compress, encryptWithThreeDES } from "../utils/utils";
import { toast } from "sonner";
import { error } from "console";

export default function Encrypt() {
  const [progress, setProgress] = useState<number>(0);

  const [text, setText] = useState<string>("");
  const [threeDESKey, setThreeDESKey] = useState<string>("");
  const [RSAPublicKey, setRSAPublicKey] = useState<string>("");
  const [RSAPrivateKey, setRSAPrivateKey] = useState<string>("");

  const [formattedText, setFormattedText] = useState<Array<string>>([""]);

  function handleText(event: ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  function handleThreeDESKey(event: ChangeEvent<HTMLInputElement>) {
    setThreeDESKey(event.target.value);
  }

  function handleRSAPublicKey(event: ChangeEvent<HTMLInputElement>): void {
    setRSAPublicKey(event.target.value);
  }

  function handleRSAPrivateKey(event: ChangeEvent<HTMLInputElement>): void {
    setRSAPrivateKey(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setProgress(1);
    event.preventDefault();
    try {
      const compressedText = compress(text);

      if (!compressedText) {
        throw new Error("Erro ao comprimir texto.");
      }

      toast.promise(Promise.resolve(compressedText), {
        loading: "Comprimindo texto...",
        success: "Texto comprimido com sucesso!",
        error: `${error}`,
      });

      const ciphertext = encryptWithThreeDES(compressedText, threeDESKey);

      if (!ciphertext) {
        throw new Error("Erro ao criptografar texto com 3DES.");
      }

      setFormattedText([ciphertext]);

      toast.promise(Promise.resolve(ciphertext), {
        loading: "Criptografando texto com 3DES...",
        success: "Texto criptografado com sucesso!",
        error: `${error}`,
      });

      setProgress(100);

      setTimeout(() => {
        setProgress(0);
      }, 500);
    } catch (error) {
      setProgress(0);
      toast.error(`${error}`);
    }
  }

  return (
    <div className="w-full max-w-xl">
      <div className="flex flex-col gap-6">
        <Card>
          {progress != 0 ? (
            <Progress value={progress} />
          ) : (
            <div className="h-2"></div>
          )}

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
                    Chave 3DES (192 bits, devido aos bits de paridade)
                  </Label>
                  <Input
                    id="threeDESKey"
                    type="text"
                    placeholder="Escreva sua chave 3DES..."
                    required
                    onChange={handleThreeDESKey}
                    value={threeDESKey}
                  ></Input>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="text">Chave Pública RSA (2048 bits)</Label>
                  <Input
                    id="RSAPublicKey"
                    type="text"
                    placeholder="Escreva a chave pública RSA do destinatário..."
                    // required
                    onChange={handleRSAPublicKey}
                    value={RSAPublicKey}
                  ></Input>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="text">Chave Privada RSA (2048 bits)</Label>
                  <Input
                    id="RSAPrivateKey"
                    type="text"
                    placeholder="Escreva sua chave privada RSA..."
                    // required
                    onChange={handleRSAPrivateKey}
                    value={RSAPrivateKey}
                  ></Input>
                </div>

                <Button type="submit">
                  <LockKeyhole />
                  Criptografar
                </Button>

                <div className="grid gap-2">
                  <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Dados a serem enviados
                  </p>
                  <div className="w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors break-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-wrap">
                    {formattedText &&
                      formattedText.map((line, index) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
