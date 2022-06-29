package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgCreateSoul = "create_soul"

var _ sdk.Msg = &MsgCreateSoul{}

func NewMsgCreateSoul(creator string, name string, description string) *MsgCreateSoul {
	return &MsgCreateSoul{
		Creator:     creator,
		Name:        name,
		Description: description,
	}
}

func (msg *MsgCreateSoul) Route() string {
	return RouterKey
}

func (msg *MsgCreateSoul) Type() string {
	return TypeMsgCreateSoul
}

func (msg *MsgCreateSoul) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateSoul) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateSoul) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
