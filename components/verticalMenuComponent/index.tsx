import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Dispatch, RefObject, SetStateAction } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface IVerticalMenuComponent {
    handleClose: (event: Event | React.SyntheticEvent) => void
    setOpen?: Dispatch<SetStateAction<boolean>>
    kebabOption: {
        type: string
        title: string
        action?: () => void
        id?: string
        path?: string
        Imgurl?: string
        nestedItems?: undefined
    }[]
    anchorRef: RefObject<HTMLButtonElement> | null
    open: boolean
}

export function VerticalMenuComponent({
    handleClose,
    kebabOption,
    anchorRef,
    open,
    setOpen,
}: IVerticalMenuComponent) {
    const router = useRouter()
    return (
        <Popper
            open={open}
            anchorEl={anchorRef?.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
            onMouseLeave={() => {
                setOpen && setOpen(false)
            }}
        >
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin:
                          placement === 'bottom-start' ? 'right top' : 'right bottom',
                      }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                                autoFocusItem={open}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                                sx={{ mb: '0', pb: '0', pt:'0'}}
                            >
                                {kebabOption &&
                                    kebabOption.map((item, index) => {
                                        return (
                                            <Box key={index}>
                                                {(() => {
                                                    switch (item.type) {
                                                        case 'LINK':
                                                            return (
                                                                <MenuItem
                                                                    key={index}
                                                                    divider={true}
                                                                    onClick={( e) => { handleClose(e);router.replace(item?.path ?? "#")} }
                                                                    autoFocus={true}
                                                                >
                                                                    <Link
                                                                        href={item.path ?? "#"}
                                                                        style={{
                                                                            textDecoration:"none",
                                                                            color:"black"
                                                                        }}
                                                                    >
                                                                        {item.title}
                                                                    </Link>
                                                                </MenuItem>
                                                            )
                                                        case 'ACTION':
                                                            return (
                                                                <MenuItem
                                                                    key={index}
                                                                    divider={ true}
                                                                    onClick={(e) => {handleClose(e)
                                                                        item.action &&
                                                                            item.action()
                                                                    }}
                                                                    autoFocus={true}
                                                                    sx={{
                                                                        color:"black"
                                                                    }}
                                                                >
                                                                    {item.title}
                                                                </MenuItem>
                                                            )
                                                        default:
                                                            return null
                                                    }
                                                })()}
                                            </Box>
                                        )
                                    })}
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );
}