package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/tbruyelle/nebula/x/sbt/types"
)

func (k msgServer) BindSoul(goCtx context.Context, msg *types.MsgBindSoul) (*types.MsgBindSoulResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, ok := k.GetSoul(ctx, msg.SoulID)
	if !ok {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("soul %d doesn't exist", msg.SoulID))
	}

	sb := types.SoulBound{
		Creator:   msg.Creator,
		Owner:     msg.Owner,
		SoulID:    msg.SoulID,
		CreatedAt: ctx.BlockHeight(),
	}
	id := k.AppendSoulBound(ctx, sb)
	return &types.MsgBindSoulResponse{Id: id}, nil
}
