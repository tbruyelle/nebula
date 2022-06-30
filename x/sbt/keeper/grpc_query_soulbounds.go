package keeper

import (
	"context"
	"fmt"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/tbruyelle/nebula/x/sbt/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Soulbounds(goCtx context.Context, req *types.QuerySoulBoundsRequest) (*types.QuerySoulBoundsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.SoulBoundKeyPrefix)
	var sbs []*types.SoulBoundResponse
	pageRes, err := query.Paginate(store, req.Pagination, func(key []byte, value []byte) error {
		var sb types.SoulBound
		err := k.cdc.Unmarshal(value, &sb)
		if err != nil {
			return err
		}
		if sb.Owner == req.Owner {
			soul, ok := k.GetSoul(ctx, sb.SoulID)
			if !ok {
				return fmt.Errorf("soulbound.soulID %d doesn't exists", sb.SoulID)
			}
			sbs = append(sbs, &types.SoulBoundResponse{
				Id:          sb.Id,
				SoulID:      sb.SoulID,
				Owner:       sb.Owner,
				BoundAt:     sb.BoundAt,
				Name:        soul.Name,
				Description: soul.Description,
				Creator:     soul.Creator,
				CreatedAt:   soul.CreatedAt,
			})
		}
		return nil
	})
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QuerySoulBoundsResponse{
		SoulBound:  sbs,
		Pagination: pageRes,
	}, nil
}
