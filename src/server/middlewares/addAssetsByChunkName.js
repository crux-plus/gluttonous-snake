export default async (ctx, next) => {
  const assetsByChunkName = ctx.state.webpackStats.toJson().assetsByChunkName;
  ctx.state.assetsByChunkName = assetsByChunkName;
}
