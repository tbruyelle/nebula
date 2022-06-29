package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/tbruyelle/nebula/x/sbt/types"
)

func (k Keeper) AppendSoul(ctx sdk.Context) uint64 {
	return 0
}

func (k Keeper) GetSoulID(ctx sdk.Context) uint64 {
	store := ctx.KVStore(k.storeKey)
	bz := store.Get(types.SoulIDKey)
	if bz == nil {
		return 0
	}
	return types.GetSoulIDFromBytes(bz)
}

func (k Keeper) SetSoulID(ctx sdk.Context, soulID uint64) {
	store := ctx.KVStore(k.storeKey)
	store.Set(types.SoulIDKey, types.GetSoulIDBytes(soulID))
}
