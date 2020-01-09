import * as React from "react"
import { createStyles, Theme, makeStyles } from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadingShadingMui: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(255, 255, 255, .3)",
    },

    loadingIconMui: {
      position: "absolute",
      fontSize: "20px",
      top: "calc(45% - 10px)",
      left: "calc(50% - 10px)",
    },
  }),
)

export const Loading = props => {
  const classes = useStyles(props)
  return (
    <div className={classes.loadingShadingMui}>
      <CircularProgress className={classes.loadingIconMui} />
    </div>
  )
}
