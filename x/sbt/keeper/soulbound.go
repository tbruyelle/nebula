package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/tbruyelle/nebula/x/sbt/types"
)

func (k Keeper) AppendSoulBound(ctx sdk.Context, sb types.SoulBound) uint64 {
	sb.Id = k.GetSoulBoundCount(ctx) + 1
	bz, err := k.cdc.Marshal(&sb)
	if err != nil {
		panic(err)
	}
	store := ctx.KVStore(k.storeKey)
	store.Set(types.SoulKey(sb.Id), bz)
	k.SetSoulBoundCount(ctx, sb.Id)
	return sb.Id
}

func (k Keeper) GetSoulBoundCount(ctx sdk.Context) uint64 {
	store := ctx.KVStore(k.storeKey)
	bz := store.Get(types.SoulBoundCountKey)
	if bz == nil {
		return 0
	}
	return types.GetSoulIDFromBytes(bz)
}

func (k Keeper) SetSoulBoundCount(ctx sdk.Context, soulBoundID uint64) {
	store := ctx.KVStore(k.storeKey)
	store.Set(types.SoulBoundCountKey, types.GetSoulIDBytes(soulBoundID))
}
