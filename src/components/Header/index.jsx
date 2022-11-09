import logo from 'src/assets/logo-mini.png'

export const Header = () => {
  return (
    <header className="h-[80px] bg-[#44142d] px-10">
      <img className="w-full max-w-[80px]" src={logo} alt="logo" />
    </header>
  )
}
