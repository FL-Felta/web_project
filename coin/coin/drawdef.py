import pyupbit
import pygame
import sys
import time
from datetime import *

interval = 'minute1'
GameDisplay = pygame.display.set_mode( (1200, 605) )
pygame.display.set_caption("etherium")
ticker = 'KRW-ETH'
FramePerSec = pygame.time.Clock()
FPS = 30


def drawnum(current_position , multiple):
    pass
    font = pygame.font.SysFont('arial',10,True,True)
    a = current_position[1]
    b= current_position[1]
    while (a < current_position[1]+605):
        img = font.render(str(b),True ,(0,0,0))
        GameDisplay.blit(img,(0,605-(a-current_position[1])))
        a += 100
        b += multiple*100
        
    
    

def coin_to_list(a):
    time_list =  list(a['open'].keys())

    coin_data_list = []
    b = []

    for i in a:
        b.append(list(a[i].values()))
    for i in range(len(time_list)):
        coin_data_list.append([time_list[i]])
        coin_data_list[i].extend([b[j][i] for j in range(6) ])
    return coin_data_list


def drawbar(coin_lista , position,width,maxi,multiple = 1):
    
    myp =pygame.mouse.get_pos()
    coin_list = [0,0,0,0,0,0,0]
    
    for i in range(1,5):
        
        coin_list[i] = coin_lista[i]/1000*multiple
    coin_list[5] = coin_lista[5]*maxi
    # print(coin_lista[5])
    if coin_list[1] > coin_list[4]:
        pygame.draw.rect(GameDisplay,(55,55,255),(position[0],(605-coin_list[5]),width-1,coin_list[5]))
    elif coin_list[1] < coin_list[4]:
        pygame.draw.rect(GameDisplay,(255,55,55),(position[0],(605-coin_list[5]),width-1,coin_list[5]))
    else:
        pygame.draw.rect(GameDisplay,(55,55,55),(position[0],(605-coin_list[5]),width-1,coin_list[5]))
    mm = position[1]*multiple
    # print((position[0]+width/2-1,(605*multiple-coin_list[2])+mm))
    pygame.draw.rect(GameDisplay,(0,0,0),(position[0]+width/2-1,(605*multiple-coin_list[2]) + mm,2,(coin_list[2]-coin_list[3])))
    if coin_list[1] > coin_list[4]:
        pygame.draw.rect(GameDisplay,(0,0,255),(position[0],(605*multiple-coin_list[1] + mm),width-1,(coin_list[1]-coin_list[4])))
    elif coin_list[1] < coin_list[4]:
        pygame.draw.rect(GameDisplay,(255,0,0),(position[0],(605*multiple-coin_list[4] + mm),width-1,(coin_list[4]-coin_list[1])))
    else:
        pygame.draw.rect(GameDisplay,(0,0,0),(position[0],(605*multiple-coin_list[1] + mm),width-1,2))
        







def append_bar(total_bar , current_time):
    time_time = current_time - timedelta(minutes=len(total_bar))
    new_bar =pyupbit.get_ohlcv(ticker=ticker,interval=interval,to=str(time_time)[:-10])
    total_bar.extend(reversed(new_bar))
