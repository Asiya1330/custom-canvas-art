// components/Steps.tsx

import React from 'react';

interface Step {
  title: string;
  description: string;
  icon: string; // URL or path to the icon image
}

interface StepsProps {
  steps: Step[];
}

const Steps: React.FC<StepsProps> = ({ steps }) => {
  return (
    <section className="bg-sky-blue py-10">
      <div className='container mx-auto'>
        <h2 className='text-4xl text-center'>Learn How To Use CustomCanvas</h2>
        <ul role="list" className="m-8">
          {steps.map((step, index) => (
            <li key={index} className="group relative flex flex-col pb-8 pl-7 last:pb-0">
              <div className="absolute bottom-0 -left-1 top-0 w-1 bg-custom-purple group-first:top-3"></div>
              <div className="absolute w-4 h-4 bg-white border-[6px] top-1 border-custom-purple rounded-full -left-[0.6rem]"></div>
              <p className="text-2xl font-semibold font-">{step.title}</p>
              <div className="flex mt-2">
                <img src={step.icon} alt="" className="h-20 w-20 mr-2" />
                <p className="text-xl text-[#01152DE5]">{step.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Steps;
