import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { LockKeyhole, LockKeyholeOpen } from "lucide-react";
import LZString from "lz-string";
import Encrypt from "./components/Encrypt";
import Decrypt from "./components/Decrypt";

export default function App() {
  return (
    <div className="flex flex-col md:flex-row min-h-svh w-full items-center justify-center p-6 md:p-10 gap-6 md:gap-10">
      <Encrypt />
      <Decrypt />
    </div>
  );
}
