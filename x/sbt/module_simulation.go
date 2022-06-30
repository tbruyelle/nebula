package sbt

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
	"github.com/tbruyelle/nebula/testutil/sample"
	sbtsimulation "github.com/tbruyelle/nebula/x/sbt/simulation"
	"github.com/tbruyelle/nebula/x/sbt/types"
)

// avoid unused import issue
var (
	_ = sample.AccAddress
	_ = sbtsimulation.FindAccount
	_ = simappparams.StakePerAccount
	_ = simulation.MsgEntryKind
	_ = baseapp.Paramspace
)

const (
	opWeightMsgCreateSoul = "op_weight_msg_create_soul"
	// TODO: Determine the simulation weight value
	defaultWeightMsgCreateSoul int = 100

	opWeightMsgBindSoul = "op_weight_msg_bind_soul"
	// TODO: Determine the simulation weight value
	defaultWeightMsgBindSoul int = 100

	// this line is used by starport scaffolding # simapp/module/const
)

// GenerateGenesisState creates a randomized GenState of the module
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	sbtGenesis := types.GenesisState{
		Params: types.DefaultParams(),
		// this line is used by starport scaffolding # simapp/module/genesisState
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&sbtGenesis)
}

// ProposalContents doesn't return any content functions for governance proposals
func (AppModule) ProposalContents(_ module.SimulationState) []simtypes.WeightedProposalContent {
	return nil
}

// RandomizedParams creates randomized  param changes for the simulator
func (am AppModule) RandomizedParams(_ *rand.Rand) []simtypes.ParamChange {

	return []simtypes.ParamChange{}
}

// RegisterStoreDecoder registers a decoder
func (am AppModule) RegisterStoreDecoder(_ sdk.StoreDecoderRegistry) {}

// WeightedOperations returns the all the gov module operations with their respective weights.
func (am AppModule) WeightedOperations(simState module.SimulationState) []simtypes.WeightedOperation {
	operations := make([]simtypes.WeightedOperation, 0)

	var weightMsgCreateSoul int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgCreateSoul, &weightMsgCreateSoul, nil,
		func(_ *rand.Rand) {
			weightMsgCreateSoul = defaultWeightMsgCreateSoul
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCreateSoul,
		sbtsimulation.SimulateMsgCreateSoul(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgBindSoul int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgBindSoul, &weightMsgBindSoul, nil,
		func(_ *rand.Rand) {
			weightMsgBindSoul = defaultWeightMsgBindSoul
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgBindSoul,
		sbtsimulation.SimulateMsgBindSoul(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}
