package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/tbruyelle/nebula/x/sbt/types"
)

func (k Keeper) GetSoul(ctx sdk.Context, id uint64) (types.Soul, bool) {
	store := ctx.KVStore(k.storeKey)
	bz := store.Get(types.SoulKey(id))
	if bz == nil {
		return types.Soul{}, false
	}
	var soul types.Soul
	err := k.cdc.Unmarshal(bz, &soul)
	if err != nil {
		panic(err)
	}
	return soul, true
}

func (k Keeper) AppendSoul(ctx sdk.Context, soul types.Soul) uint64 {
	soul.Id = k.GetSoulCount(ctx) + 1
	bz, err := k.cdc.Marshal(&soul)
	if err != nil {
		panic(err)
	}
	store := ctx.KVStore(k.storeKey)
	store.Set(types.SoulKey(soul.Id), bz)
	k.SetSoulCount(ctx, soul.Id)
	return soul.Id
}

func (k Keeper) GetSoulCount(ctx sdk.Context) uint64 {
	store := ctx.KVStore(k.storeKey)
	bz := store.Get(types.SoulCountKey)
	if bz == nil {
		return 0
	}
	return types.GetSoulIDFromBytes(bz)
}

func (k Keeper) SetSoulCount(ctx sdk.Context, soulID uint64) {
	store := ctx.KVStore(k.storeKey)
	store.Set(types.SoulCountKey, types.GetSoulIDBytes(soulID))
}
