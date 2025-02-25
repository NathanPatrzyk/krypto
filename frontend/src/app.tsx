import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import Encrypt from "./components/encrypt";
import Decrypt from "./components/decrypt";

export default function App() {
  return (
    <div className="flex flex-col min-h-svh w-full items-center justify-center p-4 md:p-8 gap-4 md:gap-4">
      <Tabs defaultValue="encrypt" className="w-full  max-w-xl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="encrypt">Criptografar</TabsTrigger>
          <TabsTrigger value="decrypt">Descriptografar</TabsTrigger>
        </TabsList>
        <TabsContent value="encrypt">
          <Encrypt />
        </TabsContent>
        <TabsContent value="decrypt">
          <Decrypt />
        </TabsContent>
      </Tabs>
    </div>
  );
}
