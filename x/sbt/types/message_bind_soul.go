package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgBindSoul = "bind_soul"

var _ sdk.Msg = &MsgBindSoul{}

func NewMsgBindSoul(creator string, owner string, soulID uint64) *MsgBindSoul {
	return &MsgBindSoul{
		Creator: creator,
		Owner:   owner,
		SoulID:  soulID,
	}
}

func (msg *MsgBindSoul) Route() string {
	return RouterKey
}

func (msg *MsgBindSoul) Type() string {
	return TypeMsgBindSoul
}

func (msg *MsgBindSoul) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgBindSoul) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgBindSoul) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
