import sys
from collections import deque

input = sys.stdin.readline

n,l = map(int, input().split())
A = list(map(int, input().split()))
    
dq=deque()
result=[]
