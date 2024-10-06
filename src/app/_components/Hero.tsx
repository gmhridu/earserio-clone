/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

export default function Hero() {
  return (
    <section className="bg-black">
      <div className="flex items-baseline justify-center pt-10 cursor-pointer">
        <h2 className="text-white border border-white text-center px-3 p-2 rounded-full">
          See What's New | <span className="text-sky-400">AI Diagram</span>
        </h2>
      </div>
      <div className="mx-auto max-w-screen-7xl px-4 py-6 lg:flex h-screen">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl text-sky-300 font-extrabold sm:text-5xl">
            Documents & diagrams
            <strong className="font-extrabold text-white sm:block">
              {" "}
              for engineering teams
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed text-muted-foreground">
            All-in-one markdown editor,collaborative canvas,
            <br />
            and diagram-as-code builder
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-black font-semibold hover:bg-muted-foreground">
              Try Eraser
              <span className="pl-1">
                <ArrowRight size={20} />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
