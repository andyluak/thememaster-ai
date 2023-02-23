import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { TypographyH1 } from "@/components/Typography";

import faq from "content/faq.json";

type FAQProps = {
  faq: {
    question: string;
    answer: string;
  }[];
};

const FAQ = ({ faq }: FAQProps) => {
  return (
    <main className="p-full text-slate-800">
      <TypographyH1 className="text-xl md:text-4xl">
        You have question ? Hopefully we got the answers !
      </TypographyH1>
      <section className="mt-8">
        <Accordion type="multiple" className="text-sm lg:text-lg">
          {faq.map((item, index) => (
            <AccordionItem value={item.question} key={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent className="md:text-base text-sm text-slate-900">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
};

export function getServerSideProps() {
  return {
    props: {
      faq,
    },
  };
}

export default FAQ;
