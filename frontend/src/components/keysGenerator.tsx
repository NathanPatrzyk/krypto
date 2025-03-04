import { FormEvent, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { KeyRound } from "lucide-react";
import { generateRSAKeys, generateThreeDESKey } from "../utils/utils";
import { toast } from "sonner";
import { error } from "console";
import { Progress } from "./ui/progress";

export default function KeysGenerator() {
  const [progress, setProgress] = useState<number>(0);

  const [threeDESKey, setThreeDESKey] = useState<string>("");
  const [RSAPublicKey, setRSAPublicKey] = useState<string>("");
  const [RSAPrivateKey, setRSAPrivateKey] = useState<string>("");

  async function handleGenerateKeys(event: FormEvent<HTMLFormElement>) {
    setProgress(1);
    event.preventDefault();

    try {
      const threeDESKey = generateThreeDESKey();

      if (!threeDESKey) {
        throw new Error("Erro ao gerar chave 3DES.");
      }

      setThreeDESKey(threeDESKey);

      toast.promise(Promise.resolve(threeDESKey), {
        loading: "Gerando chave 3DES...",
        success: "Chave 3DES gerada com sucesso!",
        error: `${error}`,
      });

      setProgress(50);

      const { RSAPublicKey, RSAPrivateKey } = await generateRSAKeys();

      if (!RSAPublicKey || !RSAPrivateKey) {
        throw new Error("Erro ao gerar chaves RSA.");
      }

      setRSAPublicKey(RSAPublicKey);
      setRSAPrivateKey(RSAPrivateKey);

      toast.promise(Promise.resolve({ RSAPublicKey, RSAPrivateKey }), {
        loading: "Gerando chaves RSA...",
        success: "Chaves RSA geradas com sucesso!",
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
            <CardTitle className="text-2xl">Gerador de Chaves RSA</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerateKeys}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Chave 3DES (192 bits, devido aos bits de paridade)
                  </p>
                  <div className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {threeDESKey
                      ? threeDESKey
                      : "A chave 3DES aparecerá aqui..."}
                  </div>
                </div>
                <div className="grid gap-2">
                  <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Chave Pública RSA (2048 bits)
                  </p>
                  <p className="text-sm opacity-70 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Compartilhe esta chave com quem precisar enviar mensagens
                    seguras para você, será utilizada para criptografar os dados
                    antes do envio.
                  </p>
                  <div className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {RSAPublicKey
                      ? RSAPublicKey
                      : "A chave pública RSA aparecerá aqui..."}
                  </div>
                </div>
                <div className="grid gap-2">
                  <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Chave Privada RSA (2048 bits)
                  </p>
                  <p className="text-sm opacity-70 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Salve-a em um lugar seguro e não a compartilhe, será útil
                    para descriptografar a mensagem recebida
                  </p>
                  <div className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {RSAPrivateKey
                      ? RSAPrivateKey
                      : "A chave privada RSA aparecerá aqui..."}
                  </div>
                </div>
                <Button type="submit">
                  <KeyRound />
                  Gerar
                </Button>
                <p className="text-xs">
                  Este site é destinado apenas para fins educacionais. Não nos
                  responsabilizamos pela segurança ou integridade dos seus
                  dados.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
