package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/tbruyelle/nebula/x/sbt/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	"github.com/cosmos/cosmos-sdk/types/query"
)

func (k Keeper) Souls(goCtx context.Context, req *types.QuerySoulsRequest) (*types.QuerySoulsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.SoulKeyPrefix)
	var souls []*types.Soul
	pageRes, err := query.Paginate(store, req.Pagination, func(key []byte, value []byte) error {
		var soul types.Soul
		err := k.cdc.Unmarshal(value, &soul)
		if err != nil {
			return err
		}
		if soul.Creator == req.Creator {
			souls = append(souls, &soul)
		}
		return nil
	})
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QuerySoulsResponse{
		Soul:       souls,
		Pagination: pageRes,
	}, nil
}
