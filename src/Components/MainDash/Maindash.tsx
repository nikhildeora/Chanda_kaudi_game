import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GameBoardtype as GameData, socketType } from "../../App";
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

	const Generateno = () => {
		const random = Math.ceil(Math.random() * 5);
    setDice(random);
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
				<h1 className={styles.heading}>Ashta Chamma</h1>
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
				<Box w={"fit-content"}>
					{" "}
					<Heading
						fontFamily={"Helvetica, Arial, Sans-Serif"}
						boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
						color={"#22EAF4"}
						fontSize={{ base: "20px", md: "30px", lg: "35px" }}
						fontStyle={"italic"}
					>
						Player - {chance}
					</Heading>
				</Box>
				<Flex
					w={"50%"}
					border={"0px solid white"}
					align={"center"}
					justify={"space-between"}
				>
					<Box
						color={"black"}
						fontSize={{ base: "25px", md: "30px", lg: "35px" }}
						fontWeight={"bold"}
						bg={"yellow"}
						w={{ base: "40px", md: "60px", lg: "60px" }}
						borderRadius={"8px"}
					>
						{dice}
					</Box>
					<button className={styles.Throwbtn} onClick={Generateno}>
						THROW
					</button>
					<button onClick={RestartGame}>Restart</button>
				</Flex>
			</Flex>
		</div>
	);
};
export default Maindash;
