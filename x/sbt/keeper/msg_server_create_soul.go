package keeper

import (
	"context"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/tbruyelle/nebula/x/sbt/types"
)

func (k msgServer) CreateSoul(goCtx context.Context, msg *types.MsgCreateSoul) (*types.MsgCreateSoulResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	soul := types.Soul{
		Creator:     msg.Creator,
		Name:        msg.Name,
		Description: msg.Description,
		CreatedAt:   time.Now().Unix(),
	}
	id := k.AppendSoul(ctx, soul)
	return &types.MsgCreateSoulResponse{Id: id}, nil
}
