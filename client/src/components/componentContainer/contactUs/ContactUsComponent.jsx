import company from "../../../assets/company.jpg";
function ContactUsComponent() {
  return (
    <div className="contact">
      <div className="infos">
        <div className="email">Email: shoush2022@hotmail.com</div>
        <div className="tel">Tel: + 96279-7393-644</div>
        <div className="fax">Fax: + 96278-0620-315</div>
      </div>
      <div className="company">
        <img src={company} alt="company" className="companyImg" />
      </div>
    </div>
  );
}

export default ContactUsComponent;
