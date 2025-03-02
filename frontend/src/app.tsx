import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import Encrypt from "./components/encrypt";
import Decrypt from "./components/decrypt";
import KeysGenerator from "./components/keysGenerator";

export default function App() {
  return (
    <>
      <div className="flex flex-col w-full items-center justify-center p-4 md:p-8 gap-4 md:gap-4">
        <Tabs defaultValue="keys-generator" className="w-full max-w-xl">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="keys-generator">Gerador de Chaves</TabsTrigger>
            <TabsTrigger value="encrypt">Criptografar</TabsTrigger>
            <TabsTrigger value="decrypt">Descriptografar</TabsTrigger>
          </TabsList>
          <TabsContent value="encrypt">
            <Encrypt />
          </TabsContent>
          <TabsContent value="decrypt">
            <Decrypt />
          </TabsContent>
          <TabsContent value="keys-generator">
            <KeysGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
