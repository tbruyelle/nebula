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
	accCreator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, err
	}
	accOwner, err := sdk.AccAddressFromBech32(msg.Owner)
	if err != nil {
		return nil, err
	}

	_, ok := k.GetSoul(ctx, msg.SoulID)
	if !ok {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("soul %d doesn't exist", msg.SoulID))
	}
	//TODO: check if not already bound
	//TODO: check creator and owner account exists

	sb := types.SoulBound{
		Creator: accCreator.String(),
		Owner:   accOwner.String(),
		SoulID:  msg.SoulID,
		BoundAt: ctx.BlockHeight(),
	}
	id := k.AppendSoulBound(ctx, sb)
	return &types.MsgBindSoulResponse{Id: id}, nil
}
