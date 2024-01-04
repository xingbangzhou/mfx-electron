import sdk_ from './sdk_'

export default async function getEnvInfo() {
  const ctx = await sdk_.ensure()
  const result = await ctx.invoke('BizEnv', 'getEnvInfo')

  return result
}
