import {
	Box,
	Button,
	ButtonGroup,
	Flex,
	Heading,
	Image,
	Stack,
	useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GameBoardtype as GameData, socketType } from "../../App";
import KaudiModal from "../KaudiModal";
import LeaderBoard from "../LeaderBoard";
import Singlediv from "../SingleDiv/Singlediv";
import styles from "./maindash.module.css";

interface CellData {
	player: number;
	codi: string;
	color: string;
	row: number;
	col: number;
}
interface MaindashProps {
	socket: socketType;
	room: string;
}

export interface BoardStateType {
	dice: number;
	chance: number;
	board: any;
	room: string;
}

const Maindash = (props: MaindashProps) => {
	const { socket, room } = props;
	const [state, setState] = useState<boolean>(true);
	const [chance, setChance] = useState<number>(1);
	const [dice, setDice] = useState<number>(0);
	const [board, setBoard] = useState<CellData[][][]>([[[]]]);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const playerPlayed = async ({ mat, chance, dice }: any) => {
		const boardState: BoardStateType = {
			dice,
			chance,
			board: mat,
			room,
		};
		await socket.emit("player_played", boardState);
	};

	useEffect(() => {
		console.log("trigered useEff");
		socket.on("player_played_server_to_client", boardState => {
			console.log(boardState);
			setDice(boardState.dice);
			setChance(boardState.chance);
			setBoard(boardState.board);
		});
	}, [socket]);

	useEffect(() => {
		let gameboard: GameData | null = JSON.parse(
			localStorage.getItem("gameboard") as string
		);

		const mat: CellData[][][] = new Array(5);
		for (let i = 0; i < 5; i++) {
			mat[i] = new Array(5).fill(null);
		}
		for (let i = 0; i < 5; i++) {
			for (let j = 0; j < 5; j++) {
				mat[i][j] = [];
			}
		}

		for (let i = 0; i < 5; i++) {
			for (let j = 0; j < 5; j++) {
				if (gameboard?.player1?.a[0] === i && gameboard?.player1?.a[1] === j) {
					mat[i][j].push({
						player: 1,
						codi: "a",
						color: "green",
						row: i,
						col: j,
					});
				}
				if (gameboard?.player1?.b[0] == i && gameboard?.player1?.b[1] == j) {
					mat[i][j].push({
						player: 1,
						codi: "b",
						color: "green",
						row: i,
						col: j,
					});
				}
				if (gameboard?.player1?.c[0] == i && gameboard?.player1?.c[1] == j) {
					mat[i][j].push({
						player: 1,
						codi: "c",
						color: "green",
						row: i,
						col: j,
					});
				}
				if (gameboard?.player1?.d[0] == i && gameboard?.player1?.d[1] == j) {
					mat[i][j].push({
						player: 1,
						codi: "d",
						color: "green",
						row: i,
						col: j,
					});
				}
				if (gameboard?.player2?.a[0] === i && gameboard?.player2?.a[1] === j) {
					mat[i][j].push({
						player: 2,
						codi: "a",
						color: "orange",
						row: i,
						col: j,
					});
				}
				if (gameboard?.player2?.b[0] == i && gameboard?.player2?.b[1] == j) {
					mat[i][j].push({
						player: 2,
						codi: "b",
						color: "orange",
						row: i,
						col: j,
					});
				}
				if (gameboard?.player2?.c[0] == i && gameboard?.player2?.c[1] == j) {
					mat[i][j].push({
						player: 2,
						codi: "c",
						color: "orange",
						row: i,
						col: j,
					});
				}
				if (gameboard?.player2?.d[0] == i && gameboard?.player2?.d[1] == j) {
					mat[i][j].push({
						player: 2,
						codi: "d",
						color: "orange",
						row: i,
						col: j,
					});
				}
				if (gameboard?.player3?.a[0] === i && gameboard?.player3?.a[1] === j) {
					mat[i][j].push({
						player: 3,
						codi: "a",
						color: "red",
						row: i,
						col: j,
					});
				}
				if (gameboard?.player3?.b[0] == i && gameboard?.player3?.b[1] == j) {
					mat[i][j].push({
						player: 3,
						codi: "b",
						color: "red",
						row: i,
						col: j,
					});
				}
				if (gameboard?.player3?.c[0] == i && gameboard?.player3?.c[1] == j) {
					mat[i][j].push({
						player: 3,
						codi: "c",
						color: "red",
						row: i,
						col: j,
					});
				}
				if (gameboard?.player3?.d[0] == i && gameboard?.player3?.d[1] == j) {
					mat[i][j].push({
						player: 3,
						codi: "d",
						color: "red",
						row: i,
						col: j,
					});
				}
				if (gameboard?.player4?.a[0] === i && gameboard?.player4?.a[1] === j) {
					mat[i][j].push({
						player: 4,
						codi: "a",
						color: "blue",
						row: i,
						col: j,
					});
				}
				if (gameboard?.player4?.b[0] == i && gameboard?.player4?.b[1] == j) {
					mat[i][j].push({
						player: 4,
						codi: "b",
						color: "blue",
						row: i,
						col: j,
					});
				}
				if (gameboard?.player4?.c[0] == i && gameboard?.player4?.c[1] == j) {
					mat[i][j].push({
						player: 4,
						codi: "c",
						color: "blue",
						row: i,
						col: j,
					});
				}
				if (gameboard?.player4?.d[0] == i && gameboard?.player4?.d[1] == j) {
					mat[i][j].push({
						player: 4,
						codi: "d",
						color: "blue",
						row: i,
						col: j,
					});
				}
			}
		}
		setBoard(mat);
		playerPlayed({ mat, chance, dice });
	}, [state]);

	const Generateno = (): void => {
		if (dice) {
			return;
		}

		let gameboard: any = JSON.parse(localStorage.getItem("gameboard")!);
		let gameArr: any[] = new Array(4);

		let i: number = 0;
		for (let player in gameboard) {
			gameArr[i] = gameboard[player];
			i++;
		}
		let p: number = 1;
		while (p < chance) {
			gameArr.push(gameArr.shift());
			p++;
		}

		for (let i: number = 0; i < 5; i++) {
			let count: number = 0;
			for (let playerchance in gameArr[i]) {
				if (
					gameArr[i][playerchance][0] === 2 &&
					gameArr[i][playerchance][1] === 2
				) {
					count++;
				}
			}
			if (count === 4) {
				setChance(prev => (prev === 4 ? 1 : prev + 1));
			} else {
				break;
			}
		}

		const random: number = Math.ceil(Math.random() * 5);
		setDice(random);

		onOpen();
	};

	const RestartGame = () => {
		let gameboard: GameData = {
			player1: {
				a: [0, 0],
				b: [0, 0],
				c: [0, 0],
				d: [0, 0],
			},
			player2: {
				a: [0, 4],
				b: [0, 4],
				c: [0, 4],
				d: [0, 4],
			},
			player3: {
				a: [4, 4],
				b: [4, 4],
				c: [4, 4],
				d: [4, 4],
			},
			player4: {
				a: [4, 0],
				b: [4, 0],
				c: [4, 0],
				d: [4, 0],
			},
		};

		localStorage.setItem("gameboard", JSON.stringify(gameboard));

		setDice(0);
		setChance(1);
		setState(!state);
	};

	return (
		<div className={styles.maindash_div_main_outerdiv}>
			<div className={styles.main_div_gameboard_outerdiv}>
				<Flex align={"center"} justify={"center"} gap={"10px"}>
					<Image
						w={"35px"}
						h={"35px"}
						boxShadow="rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
						borderRadius={"50%"}
						src="https://masai-course.s3.ap-south-1.amazonaws.com/editor/uploads/2023-03-03/Gaming%20logo1_573500.png"
						alt="Kaudi"
					/>
					<h1 className={styles.heading}>Chanda Kaudi</h1>
				</Flex>

				<div className={styles.main_div_gameboard}>
					{board.map((el, ri) => {
						return el.map((cel, ci) => {
							return (
								<Singlediv
									key={Date.now() + Math.random() * 7}
									alldata={[...cel]}
									dicefun={setDice}
									stfun={setState}
									st={state}
									rowind={ri}
									colind={ci}
									khiladifun={setChance}
									khiladi={chance}
									dicevalue={dice}
								/>
							);
						});
					})}
				</div>
				<Flex
					border={"0px solid black"}
					align={"center"}
					justify={"space-between"}
					h={"60px"}
					p={4}
					m={"auto"}
					mt={"10px"}
					w={"80%"}
					borderRadius="10px"
				>
					<Box
						border={"0px solid blue"}
						w={"fit-content"}
						background="#dddcdb"
						p={1}
						borderRadius={"8px"}
					>
						{" "}
						<Heading
							fontFamily={"Helvetica, Arial, Sans-Serif"}
							boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
							color={
								chance == 1
									? "green"
									: chance == 2
									? "orange"
									: chance == 3
									? "red"
									: "blue"
							}
							fontSize={{ base: "18px", md: "25px", lg: "35px" }}
							fontStyle={"italic"}
						>
							Player - {chance}
						</Heading>
					</Box>
					<Flex
						w={"65%"}
						border={"0px solid white"}
						align={"center"}
						justify={"space-between"}
						gap={{ base: "8px", md: "20px", lg: "20px" }}
					>
						<Box
							color={"black"}
							fontSize={{ base: "25px", md: "30px", lg: "35px" }}
							fontWeight={"bold"}
							bg={"#75f7f9"}
							w={{ base: "40px", md: "60px", lg: "60px" }}
							borderRadius={"8px"}
						>
							{dice}
						</Box>
						<button className={styles.Throwbtn} onClick={Generateno}>
							THROW
						</button>
						<Image
							alt="restart"
							src="https://masai-course.s3.ap-south-1.amazonaws.com/editor/uploads/2023-03-04/restartup_233989.jpeg"
							className={styles.RestartBtn}
							onClick={RestartGame}
						></Image>
					</Flex>
				</Flex>
				<Box display={"none"}>
					<KaudiModal
						isOpen={isOpen}
						onOpen={onOpen}
						onClose={onClose}
						dice={dice}
					/>
				</Box>
			</div>

			{/* <Flex direction="column">
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					width="40%"
					margin={"auto"}
					py={12}
					bgImage="url('https://tse4.mm.bing.net/th?id=OIP.TApezryjLkp4U5NfzannRgHaEo&pid=Api&P=0')"
					bgPosition="center"
					bgRepeat="no-repeat"
					marginTop={20}
					marginBottom={20}
					mb={2}
				>
					<ButtonGroup gap="4">
						<Link to="/">
							<Button bg="orange" variant="outline" color="white.50">
								GO TO HOME
							</Button>
						</Link>
						<Link to="/leaderboard">
							<Button bg="purple" variant="outline" color="white.50">
								SHOW LEADERBOARD
							</Button>
						</Link>
					</ButtonGroup>
				</Box>
			</Flex> */}
      <LeaderBoard  curState={state}/>
		</div>
	);
};

export default Maindash;
