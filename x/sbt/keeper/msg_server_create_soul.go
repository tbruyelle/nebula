package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/tbruyelle/nebula/x/sbt/types"
)

func (k msgServer) CreateSoul(goCtx context.Context, msg *types.MsgCreateSoul) (*types.MsgCreateSoulResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	acc, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, err
	}
	soul := types.Soul{
		Creator:     acc.String(),
		Name:        msg.Name,
		Description: msg.Description,
		CreatedAt:   ctx.BlockHeight(),
	}
	id := k.AppendSoul(ctx, soul)
	return &types.MsgCreateSoulResponse{Id: id}, nil
}
