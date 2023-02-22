import {
  TypographyH1,
  TypographyH2,
  TypographyP,
} from "@/components/Typography";
import clsx from "clsx";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import content from "content/homepage.json";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ThemeMaster AI</title>
        <meta
          name="description"
          content="best theme builder app powered by AI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <main className="bg-slate-50 text-slate-800">
          <section className="p-full flex flex-col items-center gap-4 md:flex-row md:gap-0">
            <div className="flex flex-col gap-8 md:w-2/3">
              <div>
                <TypographyH1 className="mb-0 md:text-2xl lg:text-4xl">
                  {content.hero.header}
                </TypographyH1>
                <TypographyP className="mt-1 text-gray-700">
                  {content.hero.subheader}
                </TypographyP>
              </div>
              <TypographyP className="max-w-3xl">
                {content.hero.paragraph}
              </TypographyP>
            </div>
            <div className="relative h-[350px] w-full md:h-[500px] md:w-1/2">
              <Image
                alt="placeholder"
                src="https://via.placeholder.com/150"
                fill={true}
              />
            </div>
          </section>
          <section className="p-full flex min-h-[250px] flex-col items-center justify-around bg-secondary/40 md:min-h-[300px]">
            <div>
              <TypographyH2>{content.CTA.header}</TypographyH2>
              <TypographyP className="max-w-3xl text-center text-xs font-semibold md:text-lg">
                {content.CTA.subheader}
              </TypographyP>
            </div>
            <button className="rounded-md bg-accent px-20 py-4 text-lg font-semibold md:text-xl">
              {content.CTA.button}
            </button>
          </section>
          <section className="p-full flex flex-col items-center gap-4 md:flex-row md:gap-0">
            <div className="flex flex-col items-start gap-8">
              {content.benefits.map((benefit, index) => (
                <div key={benefit.header} className="flex flex-col items-start">
                  <div className="flex flex-row items-baseline justify-center gap-4">
                    <div
                      className={clsx("h-4 w-4 rounded-full bg-red-500", {
                        "bg-green-500": index === 0,
                        "bg-blue-500": index % 2 !== 0,
                      })}
                    ></div>
                    <TypographyH2 className="text-left">
                      {benefit.header}
                    </TypographyH2>
                  </div>
                  <TypographyP>{benefit.subheader}</TypographyP>
                </div>
              ))}
            </div>

            <div className="relative h-[350px] w-full md:h-[500px] md:w-1/2">
              <Image
                alt="placeholder"
                src="https://via.placeholder.com/150"
                fill={true}
              />
            </div>
          </section>
          <section className="p-full flex min-h-[250px] flex-col items-center justify-around bg-secondary/40 md:min-h-[300px]">
            <div>
              <TypographyH2>{content.CTA.header}</TypographyH2>
              <TypographyP className="max-w-3xl text-center text-xs font-semibold md:text-lg">
                {content.CTA.subheader}
              </TypographyP>
            </div>
            <button className="rounded-md bg-accent px-20 py-4 text-lg font-semibold md:text-xl">
              {content.CTA.button}
            </button>
          </section>
        </main>
      </>
    </>
  );
};

export default Home;
