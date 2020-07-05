import {
  Twitter as TwitterIcon,
  ExternalLink as ExternalLinkIcon,
  Copy as CopyIcon,
} from 'react-feather';
import Clipboard from 'react-clipboard.js';
import { getDateFormat } from '../utils';

import { TweetData } from '../types/index';

type Props = {
  data: TweetData;
};

const Tweet = ({ data }: Props) => {
  const {
    user: { screen_name, name, avatar },
    id_str,
    full_text,
    saved_at,
    created_at,
  } = data;

  const stampLink = `https://tweetstamp.org/${id_str}`;
  const tweetLink = `https://twitter.com/${screen_name}/status/${id_str}`;
  const userLink = `https://twitter.com/${screen_name}`;

  return (
    <div className="tweet p-4">
      <header className="flex items-center">
        <div className="w-12">
          <a href={userLink} target="_blank" rel="noopener noreferrer">
            <img src={avatar} alt={name} className="rounded-full" title={name} />
          </a>
        </div>
        <a href={userLink} className="ml-3" target="_blank" rel="noopener noreferrer">
          <h1 className="text-lg font-semibold">{name}</h1>
          <p className="text-sm text-gray-700 leading-tight">{`@${screen_name}`}</p>
        </a>
        <div className="flex flex-grow justify-end">
          <Clipboard data-clipboard-text={stampLink}>
            <CopyIcon id="clipboard" className="cursor-pointer invisible text-gray-500" />
          </Clipboard>
          <a
            href={tweetLink}
            className="ml-3"
            title="Enlace a Tweet original"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </a>
        </div>
      </header>
      <article className="my-4">
        <p>{full_text}</p>
      </article>
      <footer className="py-2 border-t">
        <p className="text-sm my-1 text-gray-500">
          Publicado:{' '}
          <a
            href={stampLink}
            className="inline-block"
            title="Fecha de creación de Tweet"
            target="_blank"
            rel="noopener noreferrer"
          >
            {getDateFormat(created_at)}
            <ExternalLinkIcon className="inline-block ml-1 align-bottom w-4" />
          </a>
        </p>
        {saved_at && (
          <p className="text-sm my-1 text-gray-500">
            Archivado: {getDateFormat(saved_at)}
          </p>
        )}
      </footer>
    </div>
  );
};

export default Tweet;
