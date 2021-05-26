import debug from 'debug';

export default namespace => debug(namespace ? `${process.env.APP_NAME}:${namespace}` : process.env.APP_NAME);
