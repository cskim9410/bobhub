import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TextField, Button, IconButton, MenuItem } from '@mui/material';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MailLockOutlinedIcon from '@mui/icons-material/MailLockOutlined';
import KeyIcon from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import { regFormProps } from '../types/regType';
import { validateEmail, validatePassword } from '../../../util/validateLogin';
import {
  validateName,
  validateNickName,
  validatePWCheck,
  validatePhone,
  validateEmailCode,
  // validateTrack,
  // validateGeneration,
} from '../../../util/validateRegister';
import * as API from '../../../api/API';
import { postEmail, postEmailCode } from '../Api/registerAPI';
import logo from '../../../assets/BoBHuB_logo.png';

const RegisterImgFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 10px auto 0px auto;

  & img {
    margin: 50px auto 10px auto;
    width: 160px;
  }
`;

const RegisterFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.colors.container};
  border-radius: 4px;

  height: 850px;
  padding: 5px 20px;

  margin-bottom: 80px;

  & input {
    font-size: 15px;
    width: 540px;
  }

  & div {
    margin: 10px 0;
  }

  & div p {
    margin: -7px 0;
  }

  & div div div {
    margin-right: 10px;
  }

  & div div input {
    font-size: 18px;
    color: #3a3b3c;
  }

  & div div input::placeholder {
    font-size: 18px;
    color: #3a3b3c;
  }

  & .pw input,
  .pwCheck input {
    width: 516px;
  }

  & div div div button {
    padding: 0;
    margin-right: -8px;
    width: 25px;
    height: 25px;
  }

  & .emailInputBtnContainer {
    width: 574px;
    height: 56px;
    margin-bottom: 10px;
  }

  & .emailCodeInputBtnContainer {
    width: 574px;
    height: 60px;
  }

  & .EmailSendBtn {
    height: 30px;
    width: 100px;
    border-width: 0.5px;
    margin-left: 475px;
    margin-top: -91px;
  }

  & .EmailCodeSendBtn {
    height: 30px;
    width: 50px;
    border-width: 0.5px;
    margin-left: 510px;
    margin-top: -91px;
  }

  & .trackNumDropdown {
    height: 100px;
    width: 280px;
    margin-top: -10px;
    margin-right: 290px;
  }
`;

const RegisterButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & button {
    margin: 20px auto;
    width: 573px;
    height: 5vh;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 1.5px;
    border: none;
  }

  & a {
    color: #999;
    text-decoration: none;
  }

  & a:hover {
    text-decoration: underline;
  }

  & .backToLogin {
    font-size: 14px;
    margin-top: -5px;
    margin-right: 0;
  }
`;

const trackNum = ['SW 3???', 'SW 4???', 'IoT 1???', 'AI 5???', 'AI 6???', '??????'];

const RegisterForm = ({ onRegSubmit }: regFormProps) => {
  // useState ??????
  const [regForm, setRegForm] = useState({
    name: '',
    nickname: '',
    email: '',
    emailCode: '',
    password: '',
    passwordCheck: '',
    phone: '',
    track: '',
    generation: '',
  });

  const [emailForm, setEmailForm] = useState({
    email: '',
  });

  const { name, nickname, email, emailCode, password, passwordCheck, phone, track, generation } =
    regForm;

  const navigate = useNavigate();

  const onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegForm({
      ...regForm,
      [name]: value,
    });
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tr = e.target.value.split(' ')[0];
    let gn = '';
    let gnr = '';
    if (tr === '??????') {
      gn = '';
      gnr = '';
    }
    gn = e.target.value.split(' ')[1];
    gnr = gn.slice(0, -1);
    setRegForm({
      ...regForm,
      track: tr,
      generation: gnr,
    });
  };

  const handleRegSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onRegSubmit(regForm);

    // ?????? validation
    if (!validateName(regForm.name)) {
      alert('?????? ????????? ???????????? ????????????.');
      // form ?????????
      setRegForm({
        name: '',
        nickname: regForm.nickname,
        email: regForm.email,
        emailCode: regForm.emailCode,
        password: regForm.password,
        passwordCheck: regForm.passwordCheck,
        phone: regForm.phone,
        track: regForm.track,
        generation: regForm.generation,
      });
      return;
    }

    // ????????? validation
    if (!validateNickName(regForm.nickname)) {
      alert('????????? ????????? ???????????? ????????????.');
      // form ?????????
      setRegForm({
        name: regForm.name,
        nickname: '',
        email: regForm.email,
        emailCode: regForm.emailCode,
        password: regForm.password,
        passwordCheck: regForm.passwordCheck,
        phone: regForm.phone,
        track: regForm.track,
        generation: regForm.generation,
      });
      return;
    }

    // ????????? validation
    if (!validateEmail(regForm.email)) {
      alert('????????? ????????? ???????????? ????????????.');
      // form ?????????
      setRegForm({
        name: regForm.name,
        nickname: regForm.nickname,
        email: '',
        emailCode: regForm.emailCode,
        password: regForm.password,
        passwordCheck: regForm.passwordCheck,
        phone: regForm.phone,
        track: regForm.track,
        generation: regForm.generation,
      });
      return;
    }

    // ???????????? validation
    if (!validateEmailCode(regForm.emailCode)) {
      alert('???????????? ????????? ???????????? ????????????.');
      // form ?????????
      setRegForm({
        name: regForm.name,
        nickname: regForm.nickname,
        email: regForm.email,
        emailCode: '',
        password: regForm.password,
        passwordCheck: regForm.passwordCheck,
        phone: regForm.phone,
        track: regForm.track,
        generation: regForm.generation,
      });
      return;
    }

    // ???????????? validation
    if (!validatePassword(regForm.password)) {
      alert('???????????? ????????? ???????????? ????????????.');
      // form ?????????
      setRegForm({
        name: regForm.name,
        nickname: regForm.nickname,
        email: regForm.email,
        emailCode: regForm.emailCode,
        password: '',
        passwordCheck: regForm.passwordCheck,
        phone: regForm.phone,
        track: regForm.track,
        generation: regForm.generation,
      });
      return;
    }

    // ???????????? ?????? validation
    if (!validatePWCheck(regForm.password, regForm.passwordCheck)) {
      alert('??????????????? ???????????? ????????????.');
      // form ?????????
      setRegForm({
        name: regForm.name,
        nickname: regForm.nickname,
        email: regForm.email,
        emailCode: regForm.emailCode,
        password: regForm.password,
        passwordCheck: '',
        phone: regForm.phone,
        track: regForm.track,
        generation: regForm.generation,
      });
      return;
    }

    // ??????????????? validation
    if (!validatePhone(regForm.phone)) {
      alert('??????????????? ????????? ???????????? ????????????.');
      // form ?????????
      setRegForm({
        name: regForm.name,
        nickname: regForm.nickname,
        email: regForm.email,
        emailCode: regForm.emailCode,
        password: regForm.password,
        passwordCheck: regForm.passwordCheck,
        phone: '',
        track: regForm.track,
        generation: regForm.generation,
      });
      return;
    }

    // ?????? validation
    // if (!validateTrack(regForm.track)) {
    //   alert('???????????? ????????? ????????????.');
    //   // form ?????????
    //   setRegForm({
    //     name: regForm.name,
    //     nickname: regForm.nickname,
    //     email: regForm.email,
    //     emailCode: regForm.emailCode,
    //     password: regForm.password,
    //     passwordCheck: regForm.passwordCheck,
    //     phone: regForm.phone,
    //     // track: '',
    //     // generation: regForm.generation,
    //   });
    //   return;
    // }

    // ?????? validation
    // if (!validateGeneration(regForm.track, regForm.generation)) {
    //   alert('?????? ?????? ?????? ????????? ????????????.');
    //   // form ?????????
    //   setRegForm({
    //     name: regForm.name,
    //     nickname: regForm.nickname,
    //     email: regForm.email,
    //     emailCode: regForm.emailCode,
    //     password: regForm.password,
    //     passwordCheck: regForm.passwordCheck,
    //     phone: regForm.phone,
    //     // track: regForm.track,
    //     // generation: '',
    //   });
    //   return;
    // }

    // ????????? ????????????
    const resNickname = await API.get(`/api/users/nicknames/${regForm.nickname}`);
    if (resNickname.message.substr(0, 1) === '???') {
      alert('?????? ???????????? ??????????????????.');
      // form ?????????
      setRegForm({
        name: regForm.name,
        nickname: '',
        email: regForm.email,
        emailCode: regForm.emailCode,
        password: regForm.password,
        passwordCheck: regForm.passwordCheck,
        phone: regForm.phone,
        track: regForm.track,
        generation: regForm.generation,
      });
      return;
    }

    try {
      const resRegisterForm = await API.post('/api/users/join', regForm);

      // ???????????? ????????????
      if (!resRegisterForm) {
        // throw new Error(`${resRegisterForm.type}\n${resRegisterForm.reason}`);
        throw new Error('?????? ??????????????? ????????? ????????? ???????????????');
      } else {
        console.log(regForm);
        // form ?????????
        setRegForm({
          name: regForm.name,
          nickname: regForm.nickname,
          email: regForm.email,
          emailCode: regForm.emailCode,
          password: regForm.password,
          passwordCheck: regForm.passwordCheck,
          phone: '',
          track: regForm.track,
          generation: regForm.generation,
        });
        // ???????????? ??????, ????????????????????? ??????
        navigate('/login', { replace: true });
      }
    } catch (err) {
      alert(err);
      // form ?????????
      setRegForm({
        name: '',
        nickname: '',
        email: '',
        emailCode: '',
        password: '',
        passwordCheck: '',
        phone: '',
        track: '',
        generation: '',
      });
      return;
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordCheck = () => setShowPasswordCheck((show) => !show);

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleEmailClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const textField = (e.target as HTMLButtonElement).previousSibling;
    const div = textField?.childNodes[0];
    const input = div?.childNodes[1];
    const inputEmail = (input as HTMLInputElement).value;
    const resEmail = await API.get(`/api/users/emails/${inputEmail}`);
    if (resEmail.message.substr(0, 1) === '???') {
      alert('?????? ????????? ??????????????????.');
      // form ?????????
      setRegForm({
        name: regForm.name,
        nickname: regForm.nickname,
        email: '',
        emailCode: '',
        password: regForm.password,
        passwordCheck: regForm.passwordCheck,
        phone: regForm.phone,
        track: regForm.track,
        generation: regForm.generation,
      });
      return;
    }

    const emailBody = {
      email: inputEmail,
    };

    // ?????? ?????? ??? ????????? ??????
    const resEmailVerify = await postEmail(emailBody);

    if (!resEmailVerify) {
      alert(`${resEmailVerify.message}\n?????? ????????? ?????????.`);
      // form ?????????
      setRegForm({
        name: regForm.name,
        nickname: regForm.nickname,
        email: '',
        emailCode: '',
        password: regForm.password,
        passwordCheck: regForm.passwordCheck,
        phone: regForm.phone,
        track: regForm.track,
        generation: regForm.generation,
      });
      return;
    }
    setEmailForm(emailBody);
    alert(`${resEmailVerify.message}`); // ??????????????? ??????????????????. 1??? ?????? ??????????????????.
  };

  const handleEmailCodeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const textField = (e.target as HTMLButtonElement).previousSibling;
    const div = textField?.childNodes[0];
    const input = div?.childNodes[1];
    const inputEmailCode = (input as HTMLInputElement).value;

    const emailCodeBody = {
      email: emailForm.email,
      code: inputEmailCode,
    };

    try {
      const resEmailCodeVerify = await postEmailCode(emailCodeBody);
      if (resEmailCodeVerify.message.substr(0, 6) === '?????? ?????????') {
        throw new Error(`${resEmailCodeVerify.message}`); // ?????? ????????? ???????????? ????????????.
      } else if (resEmailCodeVerify.message.substr(0, 1) === '1') {
        throw new Error(`${resEmailCodeVerify.message}`); // 1?????? ???????????????.
      } else if (resEmailCodeVerify.error) {
        throw new Error('?????? ????????? ????????? ????????????.\n?????? ????????? ?????????.');
      } else {
        alert(`${resEmailCodeVerify.message}`); // ?????????????????????.
      }
    } catch (err) {
      alert(err);
      // form ?????????
      setRegForm({
        name: regForm.name,
        nickname: regForm.nickname,
        email: regForm.email,
        emailCode: '',
        password: regForm.password,
        passwordCheck: regForm.passwordCheck,
        phone: regForm.phone,
        track: regForm.track,
        generation: regForm.generation,
      });
      return;
    }
  };

  return (
    <RegisterImgFormContainer onSubmit={handleRegSubmit}>
      <img src={logo} alt="logo" />
      <RegisterFormContainer>
        <TextField
          name="name"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BadgeOutlinedIcon />
              </InputAdornment>
            ),
          }}
          inputProps={{ style: { WebkitBoxShadow: '0 0 0 1000px #fcf3eb inset' } }}
          sx={{
            input: {
              '&::placeholder': {
                opacity: 0.8,
              },
            },
          }}
          placeholder="??????"
          value={name}
          onChange={onTextFieldChange}
          error={!validateName(regForm.name) && regForm.name !== ''}
          helperText={
            !validateName(regForm.name) && regForm.name !== ''
              ? '????????? ?????? 2~6??? ???????????? ?????????.'
              : ''
          }
        />

        <TextField
          name="nickname"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BadgeOutlinedIcon />
              </InputAdornment>
            ),
          }}
          inputProps={{ style: { WebkitBoxShadow: '0 0 0 1000px #fcf3eb inset' } }}
          sx={{
            input: {
              '&::placeholder': {
                opacity: 0.8,
              },
            },
          }}
          placeholder="?????????(?????? ??????)"
          value={nickname}
          onChange={onTextFieldChange}
          error={!validateNickName(regForm.nickname) && regForm.nickname !== ''}
          helperText={
            !validateNickName(regForm.nickname) && regForm.nickname !== ''
              ? '???????????? ??????????????(??????????????) 5~10??? ???????????? ?????????.'
              : ''
          }
        />

        <div className="emailInputBtnContainer">
          <TextField
            required
            type="text"
            name="email"
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon />
                </InputAdornment>
              ),
            }}
            inputProps={{ style: { WebkitBoxShadow: '0 0 0 1000px #fcf3eb inset' } }}
            sx={{
              input: {
                '&::placeholder': {
                  opacity: 0.8,
                },
              },
            }}
            placeholder="?????????"
            value={email}
            onChange={onTextFieldChange}
            error={!validateEmail(regForm.email) && regForm.email !== ''}
            helperText={
              !validateEmail(regForm.email) && regForm.email !== ''
                ? '????????? ????????? ????????? ????????????.'
                : ''
            }
          />
          <Button
            className="EmailSendBtn"
            variant="contained"
            size="small"
            onClick={handleEmailClick}>
            ?????? ?????? ??????
          </Button>
        </div>

        <div className="emailCodeInputBtnContainer">
          <TextField
            required
            type="text"
            name="emailCode"
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailLockOutlinedIcon />
                </InputAdornment>
              ),
            }}
            inputProps={{ style: { WebkitBoxShadow: '0 0 0 1000px #fcf3eb inset' } }}
            sx={{
              input: {
                '&::placeholder': {
                  opacity: 0.8,
                },
              },
            }}
            placeholder="????????????"
            value={emailCode}
            onChange={onTextFieldChange}
            error={!validateEmailCode(regForm.emailCode) && regForm.emailCode !== ''}
            helperText={
              !validateEmailCode(regForm.emailCode) && regForm.emailCode !== ''
                ? '???????????? ????????? ???????????? ????????????.'
                : ''
            }
          />
          <Button
            className="EmailCodeSendBtn"
            variant="contained"
            size="small"
            onClick={handleEmailCodeClick}>
            ??????
          </Button>
        </div>

        <TextField
          className="pw"
          required
          type={showPassword ? 'text' : 'password'}
          name="password"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputProps={{ style: { WebkitBoxShadow: '0 0 0 1000px #fcf3eb inset' } }}
          sx={{
            input: {
              '&::placeholder': {
                opacity: 0.8,
              },
            },
          }}
          placeholder="????????????"
          value={password}
          onChange={onTextFieldChange}
          error={!validatePassword(regForm.password) && regForm.password !== ''}
          helperText={
            !validatePassword(regForm.password) && regForm.password !== ''
              ? '??????????????? 4~20??? ?????????????? ??????????????? ?????????.'
              : ''
          }
        />

        <TextField
          className="pwCheck"
          required
          type={showPasswordCheck ? 'text' : 'password'}
          name="passwordCheck"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle passwordCheck visibility"
                  onClick={handleClickShowPasswordCheck}
                  onMouseDown={handleMouseDownPassword}
                  edge="end">
                  {showPasswordCheck ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputProps={{ style: { WebkitBoxShadow: '0 0 0 1000px #fcf3eb inset' } }}
          sx={{
            input: {
              '&::placeholder': {
                opacity: 0.8,
              },
            },
          }}
          placeholder="???????????? ??????"
          value={passwordCheck}
          onChange={onTextFieldChange}
          error={
            !validatePWCheck(regForm.password, regForm.passwordCheck) &&
            regForm.passwordCheck !== ''
          }
          helperText={
            !validatePWCheck(regForm.password, regForm.passwordCheck) &&
            regForm.passwordCheck !== ''
              ? '??????????????? ???????????? ????????????.'
              : ''
          }
        />

        <TextField
          type="text"
          name="phone"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CallOutlinedIcon />
              </InputAdornment>
            ),
          }}
          inputProps={{ style: { WebkitBoxShadow: '0 0 0 1000px #fcf3eb inset' } }}
          sx={{
            input: {
              '&::placeholder': {
                opacity: 0.8,
              },
            },
          }}
          placeholder="???????????????(010-0000-0000, ?????? ??????)"
          value={phone}
          onChange={onTextFieldChange}
          error={!validatePhone(regForm.phone) && regForm.phone !== ''}
          helperText={
            !validatePhone(regForm.phone) && regForm.phone !== ''
              ? '????????? ??????????????? ????????? ????????????.'
              : ''
          }
        />

        {/* <TextField
          type="text"
          name="track"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LaptopMacOutlinedIcon />
              </InputAdornment>
            ),
          }}
          inputProps={{ style: { WebkitBoxShadow: '0 0 0 1000px #fcf3eb inset' } }}
          sx={{
            input: {
              '&::placeholder': {
                opacity: 0.8,
              },
            },
          }}
          placeholder="????????? ?????????(AI, IoT, SW)."
          value={track}
          onChange={onTextFieldChange}
          error={!validateTrack(regForm.track) && regForm.track !== ''}
          helperText={
            !validateTrack(regForm.track) && regForm.track !== '' ? '???????????? ????????? ????????????.' : ''
          }
        /> */}

        {/* <TextField
          type="text"
          name="generation"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <NumbersOutlinedIcon />
              </InputAdornment>
            ),
          }}
          inputProps={{ style: { WebkitBoxShadow: '0 0 0 1000px #fcf3eb inset' } }}
          sx={{
            input: {
              '&::placeholder': {
                opacity: 0.8,
              },
            },
          }}
          placeholder="????????? ??????(?????????)"
          value={generation}
          onChange={onTextFieldChange}
          error={
            !validateGeneration(regForm.track, regForm.generation) && regForm.generation !== ''
          }
          helperText={
            !validateGeneration(regForm.track, regForm.generation) && regForm.generation !== ''
              ? '?????? ?????? ?????? ????????? ????????????.'
              : ''
          }
        /> */}

        <TextField
          className="trackNumDropdown"
          id="standard-select-track"
          select
          defaultValue=""
          helperText="??????/??????"
          variant="standard"
          onChange={handleDropdownChange}>
          {trackNum.map((elem, idx) => (
            <MenuItem key={idx} value={elem}>
              {elem}
            </MenuItem>
          ))}
        </TextField>

        <RegisterButtonContainer>
          <Button variant="contained" type="submit" sx={{ backgroundColor: '#E59A59' }}>
            ????????????
          </Button>

          <div className="backToLogin">
            ?????? ????????? ?????????? &nbsp;
            <Link to="/login">?????????</Link>
          </div>
        </RegisterButtonContainer>
      </RegisterFormContainer>
    </RegisterImgFormContainer>
  );
};

export default RegisterForm;
