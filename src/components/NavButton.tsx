import { Link } from 'react-router-dom';

interface NavButtonProps {
  icon: string,
  route: string,
  linkText?: string,
}

const NavButton = (props: NavButtonProps) => {
  return (
    <div>
      <button className='p-1 md:p-3 m-1 md:m-3 h-10 bg-custom_yellow2 hover:bg-custom_orange 
                justify-center border-custom_red border rounded-md'
      >
        <div>
          <Link to={ props.route } className='flex place-itmes-center  
                lg:inline-block lg:mt-0 text-custom_blue hover:text-white'
          >
            <i className={ props.icon }></i> { props.linkText }
          </Link>
        </div>
      </button>
    </div>
  )
};

export default NavButton;
