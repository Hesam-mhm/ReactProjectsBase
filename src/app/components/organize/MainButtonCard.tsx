/**
 * MainButtonCard Component
 *
 * این کامپوننت برای نمایش دکمه‌های پایین صفحه استفاده می‌شود.
 * قابلیت‌های اصلی:
 * - پشتیبانی از چندین گروه دکمه (چپ و راست)
 * - حالت‌های مختلف دکمه (text, outlined, contained)
 * - پشتیبانی از loading و disabled در سه سطح
 * - پشتیبانی از navigation
 * - پشتیبانی از آیکون برای دکمه‌ها
 *
 * مثال‌های استفاده:
 *
 * 1. یک دکمه ساده با آیکون:
 * ```tsx
 * <MainButtonCard
 *   buttonGroups={[
 *     {
 *       position: 'right',
 *       buttons: [
 *         {
 *           title: "ذخیره",
 *           variant: "contained",
 *           onClick: () => handleSave(),
 *           color: "primary",
 *           icon: <SaveIcon />,
 *           iconPosition: "start" // یا "end"
 *         }
 *       ]
 *     }
 *   ]}
 * />
 * ```
 *
 * 2. دو دکمه (یکی چپ و یکی راست) با آیکون‌های متفاوت:
 * ```tsx
 * <MainButtonCard
 *   buttonGroups={[
 *     {
 *       position: 'left',
 *       buttons: [
 *         {
 *           title: "انصراف",
 *           variant: "outlined",
 *           onClick: () => handleCancel(),
 *           color: "secondary",
 *           icon: <CancelIcon />,
 *           iconPosition: "start"
 *         }
 *       ]
 *     },
 *     {
 *       position: 'right',
 *       buttons: [
 *         {
 *           title: "ذخیره",
 *           variant: "contained",
 *           onClick: () => handleSave(),
 *           color: "primary",
 *           icon: <SaveIcon />,
 *           iconPosition: "end"
 *         }
 *       ]
 *     }
 *   ]}
 * />
 * ```
 *
 * 3. سه دکمه (دو تا چپ و یکی راست) با آیکون‌های متفاوت:
 * ```tsx
 * <MainButtonCard
 *   buttonGroups={[
 *     {
 *       position: 'left',
 *       buttons: [
 *         {
 *           title: "حذف",
 *           variant: "text",
 *           onClick: () => handleDelete(),
 *           color: "error",
 *           icon: <DeleteIcon />,
 *           iconPosition: "start"
 *         },
 *         {
 *           title: "انصراف",
 *           variant: "outlined",
 *           onClick: () => handleCancel(),
 *           color: "secondary",
 *           icon: <CancelIcon />,
 *           iconPosition: "start"
 *         }
 *       ]
 *     },
 *     {
 *       position: 'right',
 *       buttons: [
 *         {
 *           title: "ذخیره",
 *           variant: "contained",
 *           onClick: () => handleSave(),
 *           color: "primary",
 *           icon: <SaveIcon />,
 *           iconPosition: "end"
 *         }
 *       ]
 *     }
 *   ]}
 * />
 * ```
 *
 * 4. استفاده از loading با آیکون:
 * ```tsx
 * // Loading برای همه دکمه‌ها
 * <MainButtonCard
 *   loading={true}
 *   buttonGroups={[...]}
 * />
 *
 * // Loading برای یک گروه خاص
 * <MainButtonCard
 *   buttonGroups={[
 *     {
 *       position: 'left',
 *       loading: true,
 *       buttons: [
 *         {
 *           title: "ذخیره",
 *           icon: <SaveIcon />,
 *           iconPosition: "start",
 *           variant: "contained"
 *         }
 *       ]
 *     }
 *   ]}
 * />
 * ```
 *
 * 5. استفاده از disabled با آیکون:
 * ```tsx
 * // Disabled برای یک دکمه خاص با آیکون
 * <MainButtonCard
 *   buttonGroups={[
 *     {
 *       position: 'right',
 *       buttons: [
 *         {
 *           title: "ذخیره",
 *           disabled: true,
 *           variant: "contained",
 *           onClick: () => handleSave(),
 *           icon: <SaveIcon />,
 *           iconPosition: "start"
 *         }
 *       ]
 *     }
 *   ]}
 * />
 * ```
 *
 * 6. استفاده از navigation با آیکون:
 * ```tsx
 * <MainButtonCard
 *   buttonGroups={[
 *     {
 *       position: 'left',
 *       buttons: [
 *         {
 *           title: "بازگشت",
 *           variant: "outlined",
 *           onClick: () => {},
 *           path: -1,
 *           icon: <ArrowBackIcon />,
 *           iconPosition: "start"
 *         }
 *       ]
 *     }
 *   ]}
 * />
 * ```
 */

import { Button, Card, CardContent, Grid, Box, CircularProgress, useTheme, SxProps, Theme, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../../../_metronic/partials/layout/theme-mode/styled/constants';
import { ReactNode } from 'react';

type ButtonConfig = {
  title: string;
  variant: 'text' | 'outlined' | 'contained';
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  path?: string | number;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  gridSize?: {
    xs?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  };
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
};

type ButtonGroup = {
  buttons: ButtonConfig[];
  position: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
};

type MainButtonCardProp = {
  buttonGroups: ButtonGroup[];
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  disabled?: boolean;
  loading?: boolean;
  sx?: SxProps<Theme>;
};

const MainButtonCard = ({
  buttonGroups,
  justifyContent: propJustifyContent = 'space-between',
  disabled: globalDisabled = false,
  loading: globalLoading = false,
  sx={},
}: MainButtonCardProp) => {
  const navigate = useNavigate();

  const handleButtonClick = (button: ButtonConfig) => {
    if (button.path) {
      if (typeof button.path === 'number') {
        navigate(button.path);
      } else {
        navigate(button.path);
      }
    }
    button.onClick();
  };

  // تبدیل موقعیت‌ها در ورودی
  const mappedButtonGroups = buttonGroups.map((group) => ({
    ...group,
    position: group.position === 'left' ? 'right' : 'left',
  }));

  const leftButtons = mappedButtonGroups.filter((group) => group.position === 'left');
  const rightButtons = mappedButtonGroups.filter((group) => group.position === 'right');

  // اگر فقط دکمه‌های چپ داریم، justifyContent رو flex-start می‌کنیم
  const justifyContent = rightButtons.length === 0 ? 'flex-start' : leftButtons.length === 0 ? 'flex-end' : propJustifyContent;
  const theme = useTheme();
  return (
    <Card
      sx={{
        maxWidth: '100%',
        margin: '0px 16px',
        bgcolor: COLORS.COMMON.WHITE,
        borderRadius: '8px 8px 0 0',
        boxShadow: `0px -16px 50px -4px rgba(28, 28, 28, 0.2)`,
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 104,
        pb: '0px',
        marginTop: 'auto',
        boxSizing: 'border-box',
        ...sx,
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          width: '100%',
          justifyContent,
          alignItems: 'center',
          p: 2,
        }}
      >
        {/* Right Buttons */}
        {leftButtons.length > 0 && (
          <Grid item container spacing={2} xs={12} sm={12} md={12} lg={6} xl={6} order={{xs:2,sm:2,md:2,lg:1,xl:1}} justifyContent={'flex-start'}>
            {leftButtons.flatMap((group) =>
              group.buttons.map((button, buttonIndex) => {
                const isDisabled = globalDisabled || group.disabled || button.disabled;
                const isLoading = globalLoading || group.loading || button.loading;

                return (
                  <Grid
                    item
                      xs={button.gridSize?.xs || 12}
                      sm={button.gridSize?.sm || button.gridSize?.xs || 4}
                      md={button.gridSize?.md || button.gridSize?.sm || button.gridSize?.xs || 4}
                      lg={button.gridSize?.lg || button.gridSize?.md || button.gridSize?.sm || button.gridSize?.xs || 4}
                      xl={button.gridSize?.xl || button.gridSize?.lg || button.gridSize?.md || button.gridSize?.sm || button.gridSize?.xs || 3}
                    key={`left-${buttonIndex}`}
                  >
                    <Button
                      fullWidth
                      variant={button.variant}
                      disabled={isDisabled || isLoading}
                      color={button.color}
                      startIcon={button.icon && button.iconPosition === 'start' ? button.icon : undefined}
                      endIcon={button.icon && button.iconPosition === 'end' ? button.icon : undefined}
                      sx={{
                        height: 56,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        borderRadius: '8px',
                        // position: 'relative',
                        // ...(button.color === 'success' && {
                        //   '&.MuiButton-contained': {
                        //     backgroundColor: '#2e7d32',
                        //     '&:hover': {
                        //       backgroundColor: '#1b5e20',
                        //     },
                        //   },
                        //   '&.MuiButton-outlined': {
                        //     borderColor: '#2e7d32',
                        //     color: '#2e7d32',
                        //     '&:hover': {
                        //       borderColor: '#1b5e20',
                        //       backgroundColor: 'rgba(46, 125, 50, 0.04)',
                        //     },
                        //   },
                        // }),
                        // ...(button.color === 'error' && {
                        //   '&.MuiButton-outlined': {
                        //     borderColor: theme.palette.error.main,
                        //     color: theme.palette.error.main,
                        //     '&:hover': {
                        //       borderColor: theme.palette.error.dark,
                        //       backgroundColor: theme.palette.error.main,
                        //     },
                        //   },
                        // }),
                        // '&.Mui-disabled': {
                        //   backgroundColor: theme.palette.action.disabledBackground,
                        //   color: theme.palette.action.disabled,
                        //   '& .MuiSvgIcon-root': {
                        //     color: theme.palette.action.disabled,
                        //   },
                        //   '&.MuiButton-outlined': {
                        //     borderColor: theme.palette.action.disabled,
                        //     backgroundColor: 'transparent',
                        //   },
                        // },
                      }}
                      onClick={() => handleButtonClick(button)}
                    >
                      {isLoading ? (
                        <CircularProgress
                          size={24}
                          sx={{
                            color: button.variant === 'contained' ? 'white' : button.color || 'primary.main',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                          }}
                        />
                      ) : (
                        <Typography variant="body1" sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          {button.title}
                        </Typography>
                      )}
                    </Button>
                  </Grid>
                );
              })
            )}
          </Grid>
        )}

        {/* Left Buttons */}
        {rightButtons.length > 0 && (
          <Grid item container spacing={2} xs={12} sm={12} md={12} lg={6} xl={6} order={{xs:1,sm:1,md:1,lg:2,xl:2}} justifyContent={'flex-end'}>
            {rightButtons.flatMap((group) =>
              group.buttons.map((button, buttonIndex) => {
                const isDisabled = globalDisabled || group.disabled || button.disabled;
                const isLoading = globalLoading || group.loading || button.loading;

                return (
                  <Grid
                    item
                    xs={button.gridSize?.xs || 12}
                    sm={button.gridSize?.sm || button.gridSize?.xs || 4}
                    md={button.gridSize?.md || button.gridSize?.sm || button.gridSize?.xs || 4}
                    lg={button.gridSize?.lg || button.gridSize?.md || button.gridSize?.sm || button.gridSize?.xs || 4}
                    xl={button.gridSize?.xl || button.gridSize?.lg || button.gridSize?.md || button.gridSize?.sm || button.gridSize?.xs || 3}
                    key={`right-${buttonIndex}`}
                  >
                    <Button
                      fullWidth
                      variant={button.variant}
                      disabled={isDisabled || isLoading}
                      color={button.color}
                      startIcon={button.icon && button.iconPosition === 'start' ? button.icon : undefined}
                      endIcon={button.icon && button.iconPosition === 'end' ? button.icon : undefined}
                      sx={{
                        height: 56,
                        borderRadius: '8px',
                        position: 'relative',
                        ...(button.color === 'success' && {
                          '&.MuiButton-contained': {
                            backgroundColor: theme.palette.success.main,
                            '&:hover': {
                              backgroundColor: theme.palette.success.light,
                            },
                          },
                          '&.MuiButton-outlined': {
                            borderColor: theme.palette.success.main,
                            color: theme.palette.success.main,
                            '&:hover': {
                              borderColor: theme.palette.success.dark,
                              backgroundColor: 'rgba(46, 125, 50, 0.04)',
                            },
                          },
                        }),
                        ...(button.color === 'error' && {
                          '&.MuiButton-outlined': {
                            borderColor: theme.palette.error.main,
                            color: theme.palette.error.main,
                            '&:hover': {
                              borderColor: theme.palette.error.dark,
                              backgroundColor: 'rgba(211, 47, 47, 0.04)',
                            },
                          },
                        }),
                        '&.Mui-disabled': {
                          backgroundColor: theme.palette.action.disabledBackground,
                          color: theme.palette.action.disabled,
                          '& .MuiSvgIcon-root': {
                            color: theme.palette.action.disabled,
                          },
                          '&.MuiButton-outlined': {
                            borderColor: theme.palette.action.disabled,
                            backgroundColor: 'transparent',
                          },
                        },
                      }}
                      onClick={() => handleButtonClick(button)}
                    >
                      {isLoading ? (
                        <CircularProgress
                          size={24}
                          sx={{
                            color: button.variant === 'contained' ? 'white' : button.color || 'primary.main',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                          }}
                        />
                      ) : (
                        <Typography variant="body1" sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          {button.title}
                        </Typography>
                      )}
                    </Button>
                  </Grid>
                );
              })
            )}
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default MainButtonCard;
