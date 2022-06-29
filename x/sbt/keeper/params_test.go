package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	testkeeper "github.com/tbruyelle/nebula/testutil/keeper"
	"github.com/tbruyelle/nebula/x/sbt/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.SbtKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
