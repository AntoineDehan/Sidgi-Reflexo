import "./style.scss";

function Button({ variant = "primary", href = "#", children, className = "", ...rest }) {
  return (
    <a href={href} className={`ui-btn ui-btn--${variant} ${className}`} {...rest}>
      {children}
    </a>
  );
}

export default Button;
