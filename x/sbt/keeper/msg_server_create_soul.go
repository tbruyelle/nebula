package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/tbruyelle/nebula/x/sbt/types"
)

func (k msgServer) CreateSoul(goCtx context.Context, msg *types.MsgCreateSoul) (*types.MsgCreateSoulResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgCreateSoulResponse{}, nil
}
