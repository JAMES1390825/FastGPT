/**
 * 系统插件热更新接口
 *
 * 当外部插件服务器（PLUGIN_BASE_URL）的工具列表发生变化时（新增、删除或修改工具），
 * 可调用此接口立即清除服务端内存中的插件缓存（默认缓存 30 分钟），
 * 使下一次请求自动从插件服务器和数据库重新加载最新的插件数据，
 * 无需重启服务即可完成插件热更新。
 *
 * 鉴权：需要 Root Key（rootkey 请求头）
 */
import { NextAPI } from '@/service/middleware/entry';
import { authCert } from '@fastgpt/service/support/permission/auth/common';
import { cleanSystemPluginCache } from '@fastgpt/service/core/app/plugin/controller';
import type { ApiRequestProps } from '@fastgpt/service/type/next';
import type { NextApiResponse } from 'next';

async function handler(req: ApiRequestProps, _res: NextApiResponse<any>): Promise<string> {
  // 校验 Root Key，仅管理员可调用
  await authCert({ req, authRoot: true });
  // 清除插件缓存，触发热更新
  cleanSystemPluginCache();
  return 'success';
}

export default NextAPI(handler);
