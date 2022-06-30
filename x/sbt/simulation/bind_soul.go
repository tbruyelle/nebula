package simulation

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/tbruyelle/nebula/x/sbt/keeper"
	"github.com/tbruyelle/nebula/x/sbt/types"
)

func SimulateMsgBindSoul(
	ak types.AccountKeeper,
	bk types.BankKeeper,
	k keeper.Keeper,
) simtypes.Operation {
	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)
		msg := &types.MsgBindSoul{
			Creator: simAccount.Address.String(),
		}

		// TODO: Handling the BindSoul simulation

		return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "BindSoul simulation not implemented"), nil, nil
	}
}
