package sbt_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	keepertest "github.com/tbruyelle/nebula/testutil/keeper"
	"github.com/tbruyelle/nebula/testutil/nullify"
	"github.com/tbruyelle/nebula/x/sbt"
	"github.com/tbruyelle/nebula/x/sbt/types"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.SbtKeeper(t)
	sbt.InitGenesis(ctx, *k, genesisState)
	got := sbt.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
