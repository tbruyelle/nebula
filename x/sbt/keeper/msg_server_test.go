package keeper_test

import (
	"context"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/tbruyelle/nebula/testutil/keeper"
	"github.com/tbruyelle/nebula/x/sbt/keeper"
	"github.com/tbruyelle/nebula/x/sbt/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.SbtKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
