import Card from './Card';
import LinkedText from './LinkedText';
import { UlList, ULListImage } from '../types';

interface Props {
  items: UlList[];
}

interface Job {
  title: string;
  company?: string;
  position?: string;
  location?: string;
  date?: string;
  technologies: string[];
  achievements: string[];
}

const META_KEYS = ['company', 'position', 'location', 'date'] as const;

function tidy(value?: string) {
  return value?.replace(/\s+/g, ' ').replace(/\(\s+/g, '(').replace(/\s+\)/g, ')').trim();
}

function parseJob(list: UlList): Job {
  const job: Job = {
    title: list.title,
    technologies: [],
    achievements: [],
  };

  for (const item of list.items) {
    if (item instanceof UlList) {
      const heading = item.title.replace(/:$/, '').trim().toLowerCase();
      if (heading === 'achievements') {
        job.achievements = item.items.filter((entry): entry is string => typeof entry === 'string');
      }
      continue;
    }

    if (item instanceof ULListImage || typeof item !== 'string') continue;

    const splitAt = item.indexOf(':');
    if (splitAt === -1) {
      if (!job.company) job.company = tidy(item);
      continue;
    }

    const key = item.slice(0, splitAt).trim().toLowerCase();
    const value = item.slice(splitAt + 1).trim();

    if (key === 'technologies') {
      job.technologies = value
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean);
      continue;
    }

    if (META_KEYS.includes(key as (typeof META_KEYS)[number])) {
      job[key as (typeof META_KEYS)[number]] = tidy(value);
    }
  }

  return job;
}

const ExperienceList = ({ items }: Props) => {
  return (
    <Card title='Experience' id='experience'>
      <div className='flex flex-col divide-y divide-slate-200 print:divide-slate-300'>
        {items.map((item) => {
          const job = parseJob(item);
          const isCurrent = (job.date ?? '').toLowerCase().includes('now');
          const heading = job.position || job.title;

          return (
            <article
              key={`${heading}-${job.date ?? job.title}`}
              className={`py-4 first:pt-0 last:pb-0 print:py-1.5 ${
                job.achievements.length <= 4 ? 'print:break-inside-avoid' : 'print:break-inside-auto'
              }`}
            >
              <div className='flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between print:flex-row print:justify-between print:break-inside-avoid print:break-after-avoid'>
                <div className='min-w-0'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <h3 className='text-base font-semibold text-slate-900 print:text-[12px]'>
                      {heading}
                    </h3>
                    {isCurrent && (
                      <span className='inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200 print:hidden'>
                        Current
                      </span>
                    )}
                  </div>
                  {job.company && (
                    <p className='text-sm text-slate-600 print:text-[11px]'>
                      <LinkedText text={job.company} />
                    </p>
                  )}
                </div>
                <p className='shrink-0 text-sm text-slate-500 sm:text-right print:text-[11px] print:text-slate-700'>
                  {[job.date, job.location].filter(Boolean).join(' · ')}
                </p>
              </div>

              {job.technologies.length > 0 && (
                <>
                  <ul className='mt-2 flex flex-wrap gap-1 print:hidden'>
                    {job.technologies.map((tech) => (
                      <li
                        key={tech}
                        className='rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700'
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <p className='mt-0.5 hidden text-[11px] leading-snug text-slate-700 print:block'>
                    {job.technologies.join(', ')}
                  </p>
                </>
              )}

              {job.achievements.length > 0 && (
                <ul className='mt-2 list-disc space-y-1 pl-4 text-sm leading-6 text-slate-700 print:mt-0.5 print:space-y-0 print:text-[11px] print:leading-snug'>
                  {job.achievements.map((achievement) => (
                    <li key={achievement}>
                      <LinkedText text={achievement} />
                    </li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </div>
    </Card>
  );
};

export default ExperienceList;
