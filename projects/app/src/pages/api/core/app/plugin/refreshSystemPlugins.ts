import { NextAPI } from '@/service/middleware/entry';
import { authCert } from '@fastgpt/service/support/permission/auth/common';
import { cleanSystemPluginCache } from '@fastgpt/service/core/app/plugin/controller';
import type { ApiRequestProps } from '@fastgpt/service/type/next';
import type { NextApiResponse } from 'next';

async function handler(req: ApiRequestProps, _res: NextApiResponse<any>): Promise<string> {
  await authCert({ req, authRoot: true });
  cleanSystemPluginCache();
  return 'success';
}

export default NextAPI(handler);
