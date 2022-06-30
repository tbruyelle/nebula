package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
	"github.com/tbruyelle/nebula/x/sbt/types"
)

var _ = strconv.Itoa(0)

func CmdSoulbounds() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "soulbounds [owner]",
		Short: "Query soulbounds",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			reqOwner := args[0]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QuerySoulBoundsRequest{

				Owner: reqOwner,
			}

			res, err := queryClient.Soulbounds(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
