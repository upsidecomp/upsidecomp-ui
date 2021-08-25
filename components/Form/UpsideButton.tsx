import { Button, ButtonProps } from 'react-bootstrap'

type Props = {
  variant?: 'upside-primary' | 'upside-secondary'
} & ButtonProps

export const UpsideButton = ({ children, variant = 'upside-primary', ...props }: Props) => {
  return (
    <>
      <style type="text/css">
        {`
          .btn-upside-primary {
            background-color: #F2634F;
            color: white;
            border-radius: 90px;
            padding: 16px 24px;
            width: 352px;
            height: 48px;
            justify-content: center;
            align-items: center;
            display: flex;
            margin-bottom: 10px;
          }

          .btn-upside-secondary {
            background-color: #ffffff;
            color: #00000;
            border: 2px solid #E6E8EC;
            box-sizing: border-box;
            border-radius: 90px;
            width: 352px;
            height: 48px;
            justify-content: center;
            align-items: center;
            display: flex;
            margin-bottom: 10px;
          }
        `}
      </style>

      <Button variant={variant} {...props}>
        {children}
      </Button>
    </>
  )
}
