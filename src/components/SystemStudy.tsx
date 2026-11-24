import { useState } from 'react';
import Icon, { type IconName } from './Icon';

type Stage = { name: string; icon: IconName; detail: string };
const studies: { name: string; domain: string; description: string; stages: Stage[] }[] = [
  {
    name: 'Bulk messaging gateway',
    domain: 'business.splus.ir',
    description: 'One gateway for businesses sending messages across multiple messengers.',
    stages: [
      {
        name: 'Business',
        icon: 'briefcase',
        detail: 'Businesses use the panel to manage their messaging and advertising campaigns.',
      },
      {
        name: 'Gateway',
        icon: 'tooling',
        detail:
          'I built the gateway that brings bulk messaging across multiple messengers into one service.',
      },
      {
        name: 'Messengers',
        icon: 'mail',
        detail: 'A business can reach customers on multiple messengers from the same gateway.',
      },
    ],
  },
  {
    name: 'Soroush Plus clients',
    domain: 'web.splus.ir',
    description: 'A web messenger and its adaptation into a React Native mobile client.',
    stages: [
      {
        name: 'Web client',
        icon: 'code',
        detail: 'I built and maintained the web messenger at web.splus.ir.',
      },
      {
        name: 'Adaptation',
        icon: 'layers',
        detail: 'I adapted the web application into a mobile client using React Native.',
      },
      {
        name: 'Mobile client',
        icon: 'phone',
        detail: 'The mobile client brought the web messenger experience to mobile devices.',
      },
    ],
  },
];

export default function SystemStudy() {
  const [active, setActive] = useState(0);
  const [stage, setStage] = useState(1);
  const study = studies[active];
  return (
    <section className='systems-section' id='systems' aria-labelledby='systems-title'>
      <div className='sheet systems-layout'>
        <div className='system-index'>
          <h2 id='systems-title'>Selected systems</h2>
          <div className='study-options' role='group' aria-label='Choose a software project'>
            {studies.map((item, i) => (
              <button
                type='button'
                key={item.name}
                aria-pressed={active === i}
                onClick={() => {
                  setActive(i);
                  setStage(1);
                }}
              >
                <Icon name={i === 0 ? 'tooling' : 'code'} />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
        <div className='system-diagram' key={active}>
          <div className='diagram-head'>
            <span>{active === 0 ? 'Message delivery' : 'Client development'}</span>
            <a href={'https://' + study.domain}>
              {study.domain}
              <Icon name='link' />
            </a>
          </div>
          <p className='diagram-intro'>{study.description}</p>
          <div className='stages' role='group' aria-label='Explore project stages'>
            {study.stages.map((node, i) => (
              <button
                key={node.name}
                type='button'
                aria-pressed={stage === i}
                onPointerEnter={(e) => {
                  if (e.pointerType === 'mouse') setStage(i);
                }}
                onClick={() => setStage(i)}
              >
                <span className='node'>
                  <Icon name={node.icon} />
                </span>
                <span>{node.name}</span>
              </button>
            ))}
          </div>
          <p className='stage-detail' aria-live='polite'>
            {study.stages[stage].detail}
          </p>
        </div>
      </div>
    </section>
  );
}
