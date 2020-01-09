import React from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import PostAddIcon from "@material-ui/icons/PostAdd"
import Link from "next/link"

export const ListItems = (
  <div>
    <Link href="/editor" as={`/editor`}>
      <ListItem button>
        <ListItemIcon>
          <PostAddIcon />
        </ListItemIcon>
        <ListItemText primary="Editor" />
      </ListItem>
    </Link>
  </div>
)
